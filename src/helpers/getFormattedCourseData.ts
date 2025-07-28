import formatCreationDate from "./formatCreationDate";
import getCourseDuration from "./getCourseDuration";
import { CourseType } from "../store/courses/types";
import { AuthorType } from "../store/authors/types";

interface FormattedCourseData {
    title: string;
    description: string;
    formattedDuration: string;
    formattedCreationDate: string;
    authors: string;
}

export default function getFormattedCourseData(
    course: CourseType,
    authors: AuthorType[]
): FormattedCourseData {
    const formattedCreationDateValue = formatCreationDate(course.creationDate);
    const formattedDurationValue = getCourseDuration(Number(course.duration));
    const authorsNames = authors
        .filter(author => course.authors.includes(author.id))
        .map(author => author.name)
        .join(", ");

    return {
        title: course.title,
        description: course.description,
        formattedDuration: formattedDurationValue,
        formattedCreationDate: formattedCreationDateValue,
        authors: authorsNames,
    };
}
