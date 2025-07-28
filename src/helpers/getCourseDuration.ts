export default function getCourseDuration(minutes: number): string {
    const hh = Math.floor(minutes / 60);
    const mm = minutes % 60;

    const formattedHours = hh < 10 ? `0${hh}` : hh;
    const formattedMinutes = mm < 10 ? `0${mm}` : mm;
    const hoursWord = hh === 1 ? "hour" : "hours";

    return `${formattedHours}:${formattedMinutes} ${hoursWord}`;
}
