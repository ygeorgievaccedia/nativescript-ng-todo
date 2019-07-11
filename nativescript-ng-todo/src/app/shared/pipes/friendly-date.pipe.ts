import { Pipe, PipeTransform } from "@angular/core";

export type DateType = "due" | "dayOfWeek" | "fullDayOfWeek" | "monthDay" | "weekDayMonthDay" | "friendly";

@Pipe({
    name: "friendlyDate"
})
export class FriendlyDatePipe implements PipeTransform {
    private monthNames: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "Octorber", "November", "December"];
    private weekdays: string[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

    public transform(date:Date, type: DateType = "due"): any {
        if (!date) {
            return date;
        }

        const currentDate = new Date();
        if (type === "due") {
            if (this.areDaysEqual(date, currentDate)) {
                return "Today";
            }

            if (date.getFullYear() === currentDate.getFullYear() && date.getMonth() === currentDate.getMonth() && date.getDate() === currentDate.getDate() + 1) {
                return "Tommorow";
            }

            if (date.getFullYear() === currentDate.getFullYear()) {
                return `${this.weekdays[date.getDay()].substr(0, 3)}, ${this.monthNames[date.getMonth()]} ${date.getDate()}`;
            }

            return `${this.weekdays[date.getDay()].substr(0, 3)}, ${this.monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
        }

        if (type === "friendly") {
            if (this.areDaysEqual(date, currentDate) && date.getMinutes() === currentDate.getMinutes()) {
                return "a few moments ago";
            }

            if (this.areDaysEqual(date, currentDate) && date.getMinutes() - 10 <= currentDate.getMinutes()) {
                return "a few minutes ago";
            }

            // Sun, January 26, 2017 15:30
            return `${this.weekdays[date.getDay()].substr(0, 3)}, ${this.monthNames[date.getMonth()]} ${date.getDate()} ${date.getFullYear()}, ${date.getHours()}:${date.getMinutes()}`;
        }

        if (type === "dayOfWeek") {
            // Fri
            return this.weekdays[date.getDay()].substr(0, 3);
        }

        return date;
    }

    private areDaysEqual(date: Date, anotherDate: Date) {
        return date.getFullYear() === anotherDate.getFullYear() &&
               date.getMonth() === anotherDate.getMonth() &&
               date.getDate() === anotherDate.getDate();
    }
}
