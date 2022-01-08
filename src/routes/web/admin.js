const { Attendance } = require("../../../db/models/attendance");
const { Class } = require("../../../db/models/class");
const { ClassEnroll } = require("../../../db/models/class_enroll");
const {
  ClassEnrollSubject,
} = require("../../../db/models/class_enroll_subject");
const { Lecturer } = require("../../../db/models/lecturer");
const { News } = require("../../../db/models/news");
const { NewsCategory } = require("../../../db/models/news_category");
const { Room } = require("../../../db/models/room");
const { Student } = require("../../../db/models/student");
const {
  StudentHasClassEnroll,
} = require("../../../db/models/student_has_class_enroll");
const { Subject } = require("../../../db/models/subject");

const router = require("express").Router();

const adminMiddleware = (req, res, next) => {
  if (req.session.isAdmin) {
    next();
  } else {
    res.redirect("/admin/login");
  }
};

router.get("/admin", adminMiddleware, async (req, res) => {
  const page = req.query.page || 1;
  const limit = 10;
  News.query()
    .page(page - 1, limit)
    .orderBy("created_at", "desc")
    .then((result) => {
      return res.render("pages/Admin/berita", {
        news: result.results,
        count: result.total,
        totalPage: Math.ceil(result.total / limit) || 1,
        page: page,
        currentAdmin: req.session.admin,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.render("partials/page500");
    });
});

router.get("/admin/berita/detail/:id", adminMiddleware, async (req, res) => {
  News.query()
    .findById(req.params.id)
    .then((result) => {
      if (result) {
        return res.render("pages/Admin/detail-berita", {
          berita: result,
          currentAdmin: req.session.admin,
        });
      } else {
        res.render("partials/page404");
      }
    })
    .catch((err) => {
      console.log(err);
      return res.render("partials/page500");
    });
});

router.get("/admin/berita/create", adminMiddleware, async (req, res) => {
  NewsCategory.query()
    .then((result) => {
      return res.render("pages/Admin/berita-create", {
        categories: result,
        currentAdmin: req.session.admin,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.render("partials/page500");
    });
});

router.post("/admin/berita/insert", adminMiddleware, async (req, res) => {
  News.query()
    .insert(req.body)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
      return res.render("partials/page500");
    });
});

router.delete("/admin/berita/delete/:id", adminMiddleware, async (req, res) => {
  const { id } = req.params;
  News.query()
    .delete()
    .where({
      id: id,
    })
    .then(() => {
      res.status(200).send();
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
});

// Class
router.get("/admin/classes", adminMiddleware, async (req, res) => {
  Class.query()
    .then((classes) => {
      return res.render("pages/Admin/Class/index", {
        currentAdmin: req.session.admin,
        classes: classes,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.render("partials/page500");
    });
});

router.post("/admin/classes", adminMiddleware, async (req, res) => {
  Class.query()
    .insert(req.body)
    .then(() => {
      return res.status(200).send();
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send();
    });
});

router.put("/admin/classes/:classId", adminMiddleware, async (req, res) => {
  const { classId } = req.query;

  Class.query()
    .where({
      id: classId,
    })
    .update(req.body)
    .then(() => {
      return res.status(200).send();
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send();
    });
});

// ClassEnroll
router.get("/admin/classes/:id/enroll", adminMiddleware, async (req, res) => {
  const { id: classId } = req.params;

  Class.query()
    .where({
      id: classId,
    })
    .first()
    .withGraphFetched("[class_enrolls.[lecturer]]")
    .then((classObj) => {
      Lecturer.query()
        .then((lecturers) => {
          return res.render("pages/Admin/ClassEnroll/index", {
            currentAdmin: req.session.admin,
            classObj: classObj,
            lecturers: lecturers,
          });
        })
        .catch((err) => {
          console.log(err);
          return res.render("partials/page500");
        });
    })
    .catch((err) => {
      console.log(err);
      return res.render("partials/page500");
    });
});

router.post("/admin/classes/:id/enroll", adminMiddleware, async (req, res) => {
  ClassEnroll.query()
    .insert(req.body)
    .then(() => {
      return res.status(200).send();
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send();
    });
});

// ClassEnrollHasStudent
router.get("/admin/class_enrolls/:id", adminMiddleware, async (req, res) => {
  const { id: classEnrollId } = req.params;

  ClassEnroll.query()
    .findById(classEnrollId)
    .withGraphFetched(
      "[students,student_has_class_enrolls,class,class_enroll_subjects.[lecturer,subject,attendances.[student_has_class_enroll.[student]]]]"
    )
    .then(async (classEnroll) => {
      for (let i = 0; i < classEnroll.class_enroll_subjects.length; i++) {
        classEnroll.class_enroll_subjects[i].attendances =
          classEnroll.class_enroll_subjects[i].attendances.reduce(
            (acc, curr) => {
              if (acc[curr.week] === undefined) {
                acc[curr.week] = [];
              }
              acc[curr.week].push(curr);
              return acc;
            },
            {}
          );
      }

      classEnroll.student_has_class_enrolls.forEach(function (item) {
        if (classEnroll.student_has_class_enrolls_map === undefined) {
          classEnroll.student_has_class_enrolls_map = {};
        }
        classEnroll.student_has_class_enrolls_map[item.student_nim] = item;
      });

      for (let i = 0; i < classEnroll.class_enroll_subjects.length; i++) {
        classEnroll.class_enroll_subjects = ClassEnrollSubject.sortArray(
          classEnroll.class_enroll_subjects
        );
      }

      const subjects = await Subject.query();
      const rooms = await Room.query();
      const lecturers = await Lecturer.query();

      return res.render("pages/Admin/ClassEnroll/Single/index", {
        currentAdmin: req.session.admin,
        classEnroll: classEnroll,
        semester: ClassEnroll.convertToRoman(classEnroll.semester),
        subjects: subjects,
        rooms: rooms,
        lecturers: lecturers,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.render("partials/page500");
    });
});

// ClassEnrollHasStudent
router.get(
  "/admin/class_enrolls/:id/students",
  adminMiddleware,
  async (req, res) => {
    const { id: classEnrollId } = req.params;
    const page = req.query.page || 1;
    const limit = 10;

    ClassEnroll.query()
      .findById(classEnrollId)
      .withGraphFetched("[class,students(studentModify)]")
      .modifiers({
        studentModify: (builder) => {
          builder.orderBy("student_nim", "asc");
        },
      })
      .then((classEnroll) => {
        const totalStudent = classEnroll.students.length;

        classEnroll.students = classEnroll.students.slice(
          limit * (page - 1),
          limit * (page - 1) + limit
        );

        return res.render("pages/Admin/ClassEnrollHasStudent/index", {
          currentAdmin: req.session.admin,
          classEnroll: classEnroll,
          total: totalStudent,
          totalPage: Math.ceil(totalStudent / limit) || 1,
          page: page || 1,
          semester: ClassEnroll.convertToRoman(classEnroll.semester),
        });
      })
      .catch((err) => {
        console.log(err);
        return res.render("partials/page500");
      });
  }
);

router.post(
  "/admin/class_enrolls/:id/students",
  adminMiddleware,
  async (req, res) => {
    const { id: classEnrollId } = req.params;
    const { nim } = req.body;

    StudentHasClassEnroll.query()
      .where({
        class_enroll_id: classEnrollId,
        student_nim: nim,
      })
      .first()
      .then(async (result) => {
        if (result) {
          return res.status(400).send();
        }

        await StudentHasClassEnroll.query().insert({
          class_enroll_id: classEnrollId,
          student_nim: nim,
        });

        return res.status(200).send();
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).send();
      });
  }
);

router.delete(
  "/admin/class_enrolls/:classEnrollId/students/:studentNim",
  adminMiddleware,
  async (req, res) => {
    const { classEnrollId, studentNim } = req.params;

    const temp = StudentHasClassEnroll.query()
      .where({
        class_enroll_id: classEnrollId,
        student_nim: studentNim,
      })
      .delete();

    temp
      .then(async () => {
        return res.status(200).send();
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).send();
      });
  }
);

// Student
router.get("/admin/students", adminMiddleware, async (req, res) => {
  const { nim } = req.params;
  const limit = 10;
  const page = req.query.page || 1;
  Student.query()
    .page(page - 1, limit)
    .then((students) => {
      const totalPage = Math.ceil(students.total / limit);
      return res.render("pages/Admin/Student/index", {
        totalPage: totalPage,
        page: page,
        currentAdmin: req.session.admin,
        students: students.results,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.render("partials/page500");
    });
});

router.get("/admin/students/create", adminMiddleware, async (req, res) => {
  return res.render("pages/Admin/Student/Create/index", {
    currentAdmin: req.session.admin,
  });
});

router.post("/admin/students", adminMiddleware, async (req, res) => {
  Student.query()
    .insert({
      ...req.body,
      role: "student",
      status: 1,
    })
    .then(() => {
      return res.status(200).send();
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send();
    });
});

router.get("/admin/students/:nim", adminMiddleware, async (req, res) => {
  const { nim } = req.params;

  Student.query()
    .where({
      nim: nim,
    })
    .withGraphFetched("[class_enrolls(classEnrollModify).[class,lecturer]]")
    .modifiers({
      classEnrollModify: (builder) => {
        builder.orderBy("semester", "desc").limit(1);
      },
    })
    .first()
    .then((student) => {
      if (!student) {
        return res.render("partials/page404");
      }
      return res.render("pages/Admin/Student/Single/index", {
        currentAdmin: req.session.admin,
        student: student,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.render("partials/page500");
    });
});

router.delete("/admin/students/:nim", adminMiddleware, async (req, res) => {
  const { nim } = req.params;

  Student.query()
    .where({
      nim: nim,
    })
    .delete()
    .then(() => {
      return res.status(200).send();
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send();
    });
});

router.post("/admin/students/search", adminMiddleware, async (req, res) => {
  Student.query()
    .where("nim", "like", `%${req.body.nim}%`)
    .limit(10)
    .context({
      runAfter: (students) => {
        students = students.map((student) => {
          delete student.password;
          return student;
        });

        return students;
      },
    })
    .then((students) => {
      return res.send(students);
    })
    .catch((err) => {
      console.log(err);
      return res.render("partials/page500");
    });
});

// ClassEnrollSubject
router.post(
  "/admin/class_enroll_subjects",
  adminMiddleware,
  async (req, res) => {
    ClassEnrollSubject.query()
      .insert(req.body)
      .then((resp) => {
        return res.status(200).send(resp);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).send();
      });
  }
);

router.put(
  "/admin/class_enroll_subjects/:id",
  adminMiddleware,
  async (req, res) => {
    const { id: classEnrollId } = req.params;

    ClassEnrollSubject.query()
      .update(req.body)
      .where({
        id: classEnrollId,
      })
      .then((resp) => {
        return res.status(200).send();
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).send();
      });
  }
);

router.delete(
  "/admin/class_enroll_subjects/:id",
  adminMiddleware,
  async (req, res) => {
    const { id: classEnrollId } = req.params;

    ClassEnrollSubject.query()
      .delete()
      .where({
        id: classEnrollId,
      })
      .then(() => {
        return res.send();
      })
      .catch((err) => {
        console.log(err);
        return res.send();
      });
  }
);

// Rooms
router.get("/admin/rooms", adminMiddleware, async (req, res) => {
  const limit = 10;
  const page = req.query.page || 1;

  Room.query()
    .page(page - 1, limit)
    .then((rooms) => {
      const totalData = rooms.total;
      return res.render("pages/Admin/Room/index", {
        currentAdmin: req.session.admin,
        totalData: totalData,
        rooms: rooms.results,
        totalPage: Math.ceil(totalData / limit) || 1,
        page: page,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.render("partials/page500");
    });
});

router.post("/admin/rooms", adminMiddleware, async (req, res) => {
  console.log(req.body);
  Room.query()
    .insert(req.body)
    .then((resp) => {
      // console.log(resp);
      res.status(200).send();
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send();
    });
});

router.delete("/admin/rooms/:roomName", adminMiddleware, async (req, res) => {
  const { roomName } = req.params;

  Room.query()
    .delete()
    .where({
      name: roomName,
    })
    .then(() => {
      return res.status(200).send();
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send();
    });
});

// Subjects
router.get("/admin/subjects", adminMiddleware, async (req, res) => {
  const limit = 10;
  const page = req.query.page || 1;

  Subject.query()
    .page(page - 1, limit)
    .then((subjects) => {
      const totalData = subjects.total;
      return res.render("pages/Admin/Subject/index", {
        currentAdmin: req.session.admin,
        totalData: totalData,
        subjects: subjects.results,
        totalPage: Math.ceil(totalData / limit) || 1,
        page: page,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.render("partials/page500");
    });
});

router.post("/admin/subjects", adminMiddleware, async (req, res) => {
  Subject.query()
    .insert(req.body)
    .then(() => {
      return res.status(200).send();
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send();
    });
});

router.delete(
  "/admin/subjects/:subjectCode",
  adminMiddleware,
  async (req, res) => {
    const { subjectCode } = req.params;
    Subject.query()
      .delete()
      .where({
        code: subjectCode,
      })
      .then(() => {
        return res.status(200).send();
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).send();
      });
  }
);

// Lecturer
router.get("/admin/lecturers", adminMiddleware, async (req, res) => {
  const limit = 10;
  const page = req.query.page || 1;

  Lecturer.query()
    .page(page - 1, limit)
    .orderBy("created_at", "asc")
    .then((lecturers) => {
      const totalData = lecturers.total;
      return res.render("pages/Admin/Lecturer/index", {
        currentAdmin: req.session.admin,
        totalData: totalData,
        lecturers: lecturers.results,
        totalPage: Math.ceil(totalData / limit) || 1,
        page: page,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.render("partials/page500");
    });
});

router.post("/admin/lecturers", adminMiddleware, async (req, res) => {
  Lecturer.query()
    .insert({
      ...req.body,
      status: 1,
    })
    .then(() => {
      return res.status(200).send();
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send();
    });
});

router.delete("/admin/lecturers/:nip", adminMiddleware, async (req, res) => {
  const { nip } = req.params;
  Lecturer.query()
    .delete()
    .where({
      nip: nip,
    })
    .then(() => {
      return res.status(200).send();
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send();
    });
});

// Attendances
router.post("/admin/attendances", adminMiddleware, async (req, res) => {
  const { student_has_class_enroll_id, week, class_enroll_subject_id, status } =
    req.body;
  Attendance.query()
    .where({
      student_has_class_enroll_id,
      week,
      class_enroll_subject_id,
    })
    .first()
    .then((attendance) => {
      if (attendance) {
        if (attendance.status !== status) {
          Attendance.query()
            .update({
              status,
            })
            .where({
              id: attendance.id,
            })
            .then(() => {
              return res.status(200).send({
                prev: attendance.status,
              });
            })
            .catch((err) => {
              console.log(err);
              return res.status(500).send();
            });
        }
      } else {
        Attendance.query()
          .insert({
            student_has_class_enroll_id,
            week,
            class_enroll_subject_id,
            status,
          })
          .then((attendance) => {
            return res.status(201).send({
              prev: attendance.status,
            });
          })
          .catch((err) => {
            console.log(err);
            return res.status(500).send();
          });
      }
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send();
    });
});

module.exports = router;
