export default function formatCreationDate(date: string): string {
    const [month, day, year] = date.split("/");
    return `${month.padStart(2, "0")}.${day.padStart(2, "0")}.${year}`;
}
