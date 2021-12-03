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
      name: "classes_id",
      allowNull: false,
    },
  });
  ClassEnroll.belongsTo(Class, {
    foreignKey: {
      name: "classes_id",
      allowNull: false,
    },
  });

  // ========================================================
  Student.hasMany(StudentHasClassEnroll, {
    foreignKey: {
      name: "students_nim",
      allowNull: false,
    },
  });
  ClassEnroll.hasMany(StudentHasClassEnroll, {
    foreignKey: {
      name: "class_enrolls_id",
      allowNull: false,
    },
  });

  StudentHasClassEnroll.belongsTo(Student, {
    foreignKey: {
      name: "students_nim",
      allowNull: false,
    },
  });
  StudentHasClassEnroll.belongsTo(ClassEnroll, {
    foreignKey: {
      name: "class_enrolls_id",
      allowNull: false,
    },
  });

  // ========================================================
  ClassEnroll.hasMany(ClassEnrollSubject, {
    foreignKey: {
      name: "class_enrolls_id",
      allowNull: false,
    },
  });
  Room.hasMany(ClassEnrollSubject, {
    foreignKey: {
      name: "rooms_name",
      allowNull: false,
    },
  });
  Subject.hasMany(ClassEnrollSubject, {
    foreignKey: {
      name: "subjects_code",
      allowNull: false,
    },
  });
  Lecturer.hasMany(ClassEnrollSubject, {
    foreignKey: {
      name: "lecturers_nip",
      allowNull: false,
    },
  });

  ClassEnrollSubject.belongsTo(ClassEnroll, {
    foreignKey: {
      name: "class_enrolls_id",
      allowNull: false,
    },
  });
  ClassEnrollSubject.belongsTo(Room, {
    foreignKey: {
      name: "rooms_name",
      allowNull: false,
    },
  });
  ClassEnrollSubject.belongsTo(Subject, {
    foreignKey: {
      name: "subjects_code",
      allowNull: false,
    },
  });
  ClassEnrollSubject.belongsTo(Lecturer, {
    foreignKey: {
      name: "lecturers_nip",
      allowNull: false,
    },
  });

  // ========================================================
  Lecturer.hasMany(LecturerTitle, {
    foreignKey: {
      name: "lecturers_nip",
      allowNull: false,
    },
  });
  LecturerTitle.belongsTo(Lecturer, {
    foreignKey: {
      name: "lecturers_nip",
      allowNull: false,
    },
  });

  // ========================================================
  StudentHasClassEnroll.hasMany(Attendance, {
    foreignKey: {
      name: "students_has_class_enrolls_id",
      allowNull: false,
    },
  });
  ClassEnrollSubject.hasMany(Attendance, {
    foreignKey: {
      name: "class_enroll_subjects_id",
      allowNull: false,
    },
  });
  Attendance.belongsTo(StudentHasClassEnroll, {
    foreignKey: {
      name: "students_has_class_enrolls_id",
      allowNull: false,
    },
  });
  Attendance.belongsTo(ClassEnrollSubject, {
    foreignKey: {
      name: "class_enroll_subjects_id",
      allowNull: false,
    },
  });
  Student.belongsToMany(ClassEnroll, {
    through: "student_has_class_enrolls",
  });
  ClassEnroll.belongsToMany(Student, {
    through: "student_has_class_enrolls",
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
