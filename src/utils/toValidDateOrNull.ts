export default function toValidDateOrNull(validationDateString: string | undefined): Date | null {
    if (validationDateString) {
        const date = new Date(validationDateString);
        if (!isNaN(date.getTime())) {
            return date
        }
    }
    return null

}