import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

// Components
import Header from "../src/components/Header/Header";
import CourseCard from "../src/components/Courses/components/CourseCard/CourseCard";
import CourseInfo from "../src/components/CourseInfo/CourseInfo";
import EmptyCourseList from "../src/components/EmptyCourseList/EmptyCourseList";

// Helpers
import formatCreationDate from "../src/helpers/formatCreationDate";
import getCourseDuration from "../src/helpers/getCourseDuration";

// TESTS
// Header component
describe("Header component", () => {
    it("should render logo", () => {
        render(<Header />);
        const imageElement = screen.getByRole("img");
        expect(imageElement).toBeInTheDocument();
    });

    it("should render login button", () => {
        render(<Header />);
        const loginButtonElement = screen.getByRole("button");
        expect(loginButtonElement).toBeInTheDocument();
    });
});

// CourseCard component
describe("CourseCard component", () => {
    const course = {
        id: "1",
        title: "Course Title",
        description: "Course Description",
        creationDate: "01/01/2025",
        duration: 60,
        authors: [
            "27cc3006-e93a-4748-8ca8-73d06aa93b6d",
            "f762978b-61eb-4096-812b-ebde22838167",
        ],
    };

    const authors = [
        { id: "df32994e-b23d-497c-9e4d-84e4dc02882f", name: "name1" },
        { id: "27cc3006-e93a-4748-8ca8-73d06aa93b6d", name: "name2" },
        { id: "f762978b-61eb-4096-812b-ebde22838167", name: "name3" },
    ];

    it("should render correct title", () => {
        render(<CourseCard course={course} authors={authors} />);
        const titleElement = screen.getByText("Course Title");
        expect(titleElement).toBeInTheDocument();
    });

    it("should render correct description", () => {
        render(<CourseCard course={course} authors={authors} />);
        const descriptionElement = screen.getByText("Course Description");
        expect(descriptionElement).toBeInTheDocument();
    });

    it("should render formatted course duration", () => {
        render(<CourseCard course={course} authors={authors} />);
        const durationElement = screen.getByText("01:00 hour");
        expect(durationElement).toBeInTheDocument();
    });

    it("should render formatted date of course creation", () => {
        render(<CourseCard course={course} authors={authors} />);
        const creationElement = screen.getByText("01.01.2025");
        expect(creationElement).toBeInTheDocument();
    });

    it("should render authors list", () => {
        render(<CourseCard course={course} authors={authors} />);
        const authorsElement = screen.getByText("name2, name3");
        expect(authorsElement).toBeInTheDocument();
    });
});

// CourseInfo component
describe("CourseInfo component", () => {
    const coursesList = [
        {
            id: "1",
            title: "Course 1",
            description: "Course 1 description",
            creationDate: "01/01/2025",
            duration: 60,
            authors: [
                "27cc3006-e93a-4748-8ca8-73d06aa93b6d",
                "f762978b-61eb-4096-812b-ebde22838167",
            ],
        },
        {
            id: "2",
            title: "Course 2",
            description: "Course 2 description",
            creationDate: "01/02/2025",
            duration: 90,
            authors: ["df32994e-b23d-497c-9e4d-84e4dc02882f"],
        },
    ];
    const authors = [
        { id: "df32994e-b23d-497c-9e4d-84e4dc02882f", name: "name1" },
        { id: "27cc3006-e93a-4748-8ca8-73d06aa93b6d", name: "name2" },
        { id: "f762978b-61eb-4096-812b-ebde22838167", name: "name3" },
    ];

    it("should render correct title", () => {
        render(<CourseInfo courses={coursesList} authors={authors} showCourseId ="1"/>);
        const titleElement = screen.getByText("Course 1");
        expect(titleElement).toBeInTheDocument();
    });

    it("should render correct description", () => {
        render(<CourseInfo courses={coursesList} authors={authors} showCourseId ="1"/>);
        const descriptionElement = screen.getByText("Course 1 description");
        expect(descriptionElement).toBeInTheDocument();
    });

    it("should render formatted course duration", () => {
        render(<CourseInfo courses={coursesList} authors={authors} showCourseId ="1"/>);
        const durationElement = screen.getByText("01:00 hour");
        expect(durationElement).toBeInTheDocument();
    });

    it("should render formatted date of course creation", () => {
        render(<CourseInfo courses={coursesList} authors={authors} showCourseId ="1"/>);
        const creationElement = screen.getByText("01.01.2025");
        expect(creationElement).toBeInTheDocument();
    });

    it("should render authors list", () => {
        render(<CourseInfo courses={coursesList} authors={authors} showCourseId ="1"/>);
        const authorsElement = screen.getByText("name2, name3");
        expect(authorsElement).toBeInTheDocument();
    });

    it("should render BACK button without functionality", () => {
        render(<CourseInfo courses={coursesList} authors={authors} showCourseId ="1"/>);
        const backButtonElement = screen.getByRole("button");
        expect(backButtonElement).toBeInTheDocument();
    });
});

// EmptyCourseList component
describe("EmptyCourseList component", () => {
    it("should render title with text: 'Course List is Empty'", () => {
        render(<EmptyCourseList />);
        const titleElement = screen.getByText("Course List is Empty");
        expect(titleElement).toBeInTheDocument();
    });

    it("should render subtitle with text: 'Please use Add New Course button to add your first course'", () => {
        render(<EmptyCourseList />);
        const subTitleElement = screen.getByText(
            'Please use "Add New Course" button to add your first course'
        );
        expect(subTitleElement).toBeInTheDocument();
    });

    it("should render Add New Course button without functionality", () => {
        render(<EmptyCourseList />);
        const addNewCourseButtonElement = screen.getByRole("button");
        expect(addNewCourseButtonElement).toBeInTheDocument();
    });
});

// Helper functions
describe("Helper functions", () => {
    it("formatCreationDate function should return formatted dates", () => {
        const date = "01/05/2025";
        const formattedDate = formatCreationDate(date);
        expect(formattedDate).toBe("01.05.2025");
    });

    it("getCourseDuration function should return formatted duration of the course", () => {
        expect(getCourseDuration(60)).toBe("01:00 hour");
        expect(getCourseDuration(66)).toBe("01:06 hour");
        expect(getCourseDuration(150)).toBe("02:30 hours");
    });
});
