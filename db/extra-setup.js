function applyExtraSetup(sequelize) {
  const {
    Class,
    Subject,
    ClassEnroll,
    StudentHasClassEnroll,
    Student,
    ClassEnrollSubject,
    Lecturer,
    Room,
    LecturerTitle,
    Attendance,
    News,
    NewsCategory,
  } = sequelize.models;

  // ========================================================
  Class.hasMany(ClassEnroll, {
    foreignKey: {
      name: "classesId",
      allowNull: false,
    },
  });
  ClassEnroll.belongsTo(Class, {
    foreignKey: {
      name: "classesId",
      allowNull: false,
    },
  });

  // ========================================================
  Student.hasMany(StudentHasClassEnroll, {
    foreignKey: {
      name: "studentsNim",
      allowNull: false,
    },
  });
  ClassEnroll.hasMany(StudentHasClassEnroll, {
    foreignKey: {
      name: "classEnrollsId",
      allowNull: false,
    },
  });

  StudentHasClassEnroll.belongsTo(Student, {
    foreignKey: {
      name: "studentsNim",
      allowNull: false,
    },
  });
  StudentHasClassEnroll.belongsTo(ClassEnroll, {
    foreignKey: {
      name: "classEnrollsId",
      allowNull: false,
    },
  });
  Student.belongsToMany(ClassEnroll, {
    through: StudentHasClassEnroll,
    foreignKey: {
      name: "studentsNim",
      allowNull: false,
    },
  });
  ClassEnroll.belongsToMany(Student, {
    through: StudentHasClassEnroll,
    foreignKey: {
      name: "classEnrollsId",
      allowNull: false,
    },
  });

  // ========================================================
  ClassEnroll.hasMany(ClassEnrollSubject, {
    foreignKey: {
      name: "classEnrollsId",
      allowNull: false,
    },
  });
  Room.hasMany(ClassEnrollSubject, {
    foreignKey: {
      name: "roomsName",
      allowNull: false,
    },
  });
  Subject.hasMany(ClassEnrollSubject, {
    foreignKey: {
      name: "subjectsCode",
      allowNull: false,
    },
  });
  Lecturer.hasMany(ClassEnrollSubject, {
    foreignKey: {
      name: "lecturersNip",
      allowNull: false,
    },
  });

  ClassEnrollSubject.belongsTo(ClassEnroll, {
    foreignKey: {
      name: "classEnrollsId",
      allowNull: false,
    },
  });
  ClassEnrollSubject.belongsTo(Room, {
    foreignKey: {
      name: "roomsName",
      allowNull: false,
    },
  });
  ClassEnrollSubject.belongsTo(Subject, {
    foreignKey: {
      name: "subjectsCode",
      allowNull: false,
    },
  });
  ClassEnrollSubject.belongsTo(Lecturer, {
    foreignKey: {
      name: "lecturersNip",
      allowNull: false,
    },
  });
  ClassEnroll.belongsToMany(Subject, {
    through: ClassEnrollSubject,
    foreignKey: {
      name: "classEnrollsId",
      allowNull: false,
    },
  });
  Subject.belongsToMany(ClassEnroll, {
    through: ClassEnrollSubject,
    foreignKey: {
      name: "subjectsCode",
      allowNull: false,
    },
  });

  // ========================================================
  Lecturer.hasMany(LecturerTitle, {
    foreignKey: {
      name: "lecturersNip",
      allowNull: false,
    },
  });
  LecturerTitle.belongsTo(Lecturer, {
    foreignKey: {
      name: "lecturersNip",
      allowNull: false,
    },
  });

  // ========================================================
  StudentHasClassEnroll.hasMany(Attendance, {
    foreignKey: {
      name: "studentsHasClassEnrollsId",
      allowNull: false,
    },
  });
  ClassEnrollSubject.hasMany(Attendance, {
    foreignKey: {
      name: "classEnrollSubjectsId",
      allowNull: false,
    },
  });
  Attendance.belongsTo(StudentHasClassEnroll, {
    foreignKey: {
      name: "studentsHasClassEnrollsId",
      allowNull: false,
    },
  });
  Attendance.belongsTo(ClassEnrollSubject, {
    foreignKey: {
      name: "classEnrollSubjectsId",
      allowNull: false,
    },
  });
  Lecturer.hasMany(ClassEnroll, {
    foreignKey: {
      name: "lecturersNip",
      allowNull: false,
    },
  });
  ClassEnroll.belongsTo(Lecturer, {
    foreignKey: {
      name: "lecturersNip",
      allowNull: false,
    },
  });

  // ========================================================
  NewsCategory.hasMany(News, {
    foreignKey: {
      name: "newsCategoriesName",
      allowNull: false,
    },
  });
  News.belongsTo(NewsCategory, {
    foreignKey: {
      name: "newsCategoriesName",
      allowNull: false,
    },
  });
}

module.exports = {
  applyExtraSetup,
};
