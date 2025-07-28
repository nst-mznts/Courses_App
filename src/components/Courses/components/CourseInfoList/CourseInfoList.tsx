import { FC } from "react";

import "./CourseInfoList.scss";

interface InfoItem {
    label: string;
    value: string;
}

interface CourseInfoListProps {
    items: InfoItem[];
    styles?: string;
}

const CourseInfoList: FC<CourseInfoListProps> = ({ items, styles = "" }) => {
    return (
        <ul className="duration--info flex--column">
            {items.map((item, index) => (
                <li key={index} className="duration--line flex--row">
                    <h4 className={`text--b2 ${styles}`}>{item.label}</h4>
                    <p className="text--b1">{item.value}</p>
                </li>
            ))}
        </ul>
    );
};

export default CourseInfoList;
