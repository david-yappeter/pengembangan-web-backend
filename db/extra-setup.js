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
  } = sequelize.models;

  // ========================================================
  Class.hasMany(ClassEnroll, {
    foreignKey: "classes_id",
  });
  ClassEnroll.belongsTo(Class, {
    foreignKey: "classes_id",
  });

  // ========================================================
  Student.hasMany(StudentHasClassEnroll, {
    foreignKey: "students_nim",
  });
  ClassEnroll.hasMany(StudentHasClassEnroll, {
    foreignKey: "class_enrolls_id",
  });

  StudentHasClassEnroll.belongsTo(Student, {
    foreignKey: "students_nim",
  });
  StudentHasClassEnroll.belongsTo(ClassEnroll, {
    foreignKey: "class_enrolls_id",
  });
  // ========================================================
  ClassEnroll.hasMany(ClassEnrollSubject, {
    foreignKey: "class_enrolls_id",
  });
  Room.hasMany(ClassEnrollSubject, {
    foreignKey: "rooms_name",
  });
  Subject.hasMany(ClassEnrollSubject, {
    foreignKey: "subjects_code",
  });
  Lecturer.hasMany(ClassEnrollSubject, {
    foreignKey: "lecturers_nip",
  });

  ClassEnrollSubject.belongsTo(ClassEnroll, {
    foreignKey: "class_enrolls_id",
  });
  ClassEnrollSubject.belongsTo(Room, {
    foreignKey: "rooms_name",
  });
  ClassEnrollSubject.belongsTo(Subject, {
    foreignKey: "subjects_code",
  });
  ClassEnrollSubject.belongsTo(Lecturer, {
    foreignKey: "lecturers_nip",
  });

  // ========================================================
  Lecturer.hasMany(LecturerTitle, {
    foreignKey: "lecturers_nip",
  });
  LecturerTitle.belongsTo(Lecturer, {
    foreignKey: "lecturers_nip",
  });
  // ========================================================
  StudentHasClassEnroll.hasMany(Attendance, {
    foreignKey: "students_has_class_enrolls_id",
  });
  ClassEnrollSubject.hasMany(Attendance, {
    foreignKey: "class_enroll_subjects_id",
  });
  Attendance.belongsTo(StudentHasClassEnroll, {
    foreignKey: "students_has_class_enrolls_id",
  });
  Attendance.belongsTo(ClassEnrollSubject, {
    foreignKey: "class_enroll_subjects_id",
  });
}

module.exports = {
  applyExtraSetup,
};
