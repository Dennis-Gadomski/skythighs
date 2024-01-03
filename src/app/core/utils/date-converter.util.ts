export class DateConverterUtil {

    static convertDateToMysqlDate(date: Date | undefined): string {
        if (!(date instanceof Date) || isNaN(date.getTime())) {
            throw new Error('Invalid date provided');
        }

        const isoString = date.toISOString();
        const splittedDate = isoString.split('T');

        const dateString = splittedDate[0];
        const timeString = splittedDate[1].substring(0, splittedDate[1].length - 5);

        return `${dateString} ${timeString}`;
    }
}