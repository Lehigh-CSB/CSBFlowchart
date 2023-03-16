class Course {
  constructor(
    title, // String
    description, // String
    credits, // int
    designation, // String
    completed, // boolean
    used, // boolean
    grade, // String
    level, // int
    prereqs, // array
    coreqs, // String
    offered // String
  ) {
    this.title = title;
    this.description = description;
    this.credits = credits;
    this.designation = designation;
    this.completed = completed;
    this.used = used;
    this.grade = grade;
    this.level = level;
    this.prereqs = prereqs;
    this.coreqs = coreqs;
    this.offered = offered;
  }
  updateTitle(update) {
    this.title = update;
  }
  updateDescription(update) {
    this.description = update;
  }
  updateCredits(update) {
    this.credits = update;
  }
  updateDesignation(update) {
    this.designation = update;
  }
  updateCompleted(update) {
    this.completed = update;
  }
  updateUsed(update) {
    this.used = update;
  }
  updateUsed(update) {
    this.used = update;
  }
  updateGrade(update) {
    this.grade = update;
  }
  updatelevel(update) {
    this.level = update;
  }
  updatePrereqs(update) {
    this.prereqs = update;
  }
  updateCoreqs(update) {
    this.coreqs = update;
  }
  updateOffered(update) {
    this.offered = update;
  }
}

export default course;
