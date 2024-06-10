#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
//Define a sti=udent class
class student {
    static counter = 10000;
    id;
    name;
    courses;
    balance;
    constructor(name) {
        this.id = student.counter++;
        this.name = name;
        this.courses = []; //Initiize an empty array for courses
        this.balance = 3000;
    }
    //method to enroll a student in a course
    enroll_course(course) {
        this.courses.push(course);
    }
    //method to view a student blance
    enrool_balance() {
        console.log(chalk.green(`Balance for ${this.name} : ${this.balance} $`));
    }
    //method to pay student fess
    pay_fees(amount) {
        this.balance -= amount;
        console.log(chalk.redBright(`$${amount} Fess pad successfully for ${this.name}`));
        console.log(chalk.green(`Remaning balance is: ${this.balance}`));
    }
    //method to show a student status
    student_status() {
        console.log(chalk.greenBright(`\n\tID: ${this.id}`));
        console.log(chalk.magenta(`\n\tName: ${this.name}`));
        console.log(chalk.red(`\n\tCourse: ${this.courses}`));
        console.log(chalk.green(`\n\tBalance: ${this.balance}`));
    }
}
// student manager class to manage new student
class student_Manager {
    students;
    constructor() {
        this.students = [];
    }
    // method to add a new student
    add_student(name) {
        let Student = new student(name);
        this.students.push(Student);
        console.log(chalk.red(`Student: ${name} added successfully. Student ID: ${Student.id}`));
    }
    //Method to enrold a student
    enroll_student(studentID, course) {
        let Student = this.find_Student(studentID);
        if (Student) {
            Student.enroll_course(course);
            console.log(chalk.blueBright(`${Student.name} erolled in: ${course}: Successfully`));
        }
    }
    view_Student_Balance(studentID) {
        let Student = this.find_Student(studentID);
        if (Student) {
            Student.enrool_balance();
        }
        else
            (console.log(chalk.red("Student not found. Please enter a correct StudentID")));
    }
    pay_Stuent_Fee(studentID, amount) {
        let Student = this.find_Student(studentID);
        if (Student) {
            Student.pay_fees(amount);
        }
        else {
            console.log(chalk.red("Student not found. Please enter a correct StudentID "));
        }
    }
    show_Student_Status(studentID) {
        let Student = this.find_Student(studentID);
        if (Student) {
            Student.student_status();
        }
        else {
            console.log(chalk.red("Student not found. Please enter a correct StudentID"));
        }
    }
    //Method FInd Student to make Easy work
    //Detail method//this.students.find(std => std.id === studentID)
    find_Student(studentID) {
        return this.students.find(std => std.id === studentID);
    }
}
//Main function to run a method
async function main() {
    console.log(chalk.yellow(".".repeat(80)));
    console.log(chalk.blue("Wellcome Student Mangment System"));
    console.log(chalk.cyan("Muhammad Mehdi Raza"));
    console.log(chalk.yellow(".".repeat(80)));
    let Student_manager = new student_Manager();
    //use while loop to program runing
    while (true) {
        let choise = await inquirer.prompt([
            {
                name: "choise",
                type: "list",
                Message: "Select an option",
                choices: ["Add Student",
                    "Enroll Student",
                    "View Student Balance",
                    "Pay Fees",
                    "View Student Status",
                    "Exit...",
                ]
            }
        ]);
        //Switch case use to run code 
        switch (choise.choise) {
            case "Add Student":
                let nameAdd = await inquirer.prompt([
                    {
                        name: "Add_Student",
                        type: "input",
                        message: "Pleace Enter Your Good Name",
                    }
                ]);
                Student_manager.add_student(nameAdd.Add_Student);
                break;
            case "Enroll Student":
                let courseAdd = await inquirer.prompt([
                    {
                        name: "enterID",
                        type: "number",
                        message: "Enter a Sdudent ID",
                    },
                    {
                        name: "course",
                        type: "input",
                        messange: "Enter a Course Name",
                    }
                ]);
                Student_manager.enroll_student(courseAdd.enterID, courseAdd.course);
                break;
            case "View Student Balance":
                let balanceInput = await inquirer.prompt([
                    {
                        name: "enterID",
                        type: "number",
                        message: "Enter a Student ID"
                    }
                ]);
                Student_manager.view_Student_Balance(balanceInput.enterID);
                break;
            case "Pay Fees":
                let balanceView = await inquirer.prompt([
                    {
                        name: "enterID",
                        type: "number",
                        message: "Enter a Student ID"
                    },
                    {
                        name: "viewBalance",
                        type: "number",
                        message: "Enter the Amount to Pay"
                    }
                ]);
                Student_manager.pay_Stuent_Fee(balanceView.enterID, balanceView.viewBlance);
                break;
            case "View Student Status":
                let statusView = await inquirer.prompt([
                    {
                        name: "enterID",
                        type: "number",
                        message: "Enter a Student ID"
                    },
                ]);
                Student_manager.show_Student_Status(statusView.enterID);
                break;
            case "Exit...":
                console.log(chalk.bgGray(`Exiting.....`));
                process.exit();
        }
    }
}
;
//Calling a main function
//if we want to call function we have to right function name
main();
