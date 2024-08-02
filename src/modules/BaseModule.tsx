export const handleImageError = (e: any) => {
    const imgElement = e.currentTarget as HTMLImageElement;
    imgElement.src = 'https://via.placeholder.com/500x750';
    //the movie db: imgElement.src='https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg'
};

export const handleBackgroundImageError = (e: any) => {
    e.target.style.backgroundImage = 'url(https://via.placeholder.com/500x750)';
    const imgElement = e.currentTarget as HTMLImageElement;
    imgElement.src = 'https://via.placeholder.com/500x750';
};

export function shortenNumber(number: any) {
    if (number >= 1000000000) {
        return (number / 1000000000).toFixed(1) + 'b';
    }
    if (number >= 1000000) {
        return (number / 1000000).toFixed(1) + 'm';
    }
    if (number >= 1000) {
        return (number / 1000).toFixed(1) + 'k';
    }
    return number;
}

export const monthNames = [
    "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
];
export const currentDate = new Date();
export const currentMonth = currentDate.getMonth();
export const currentMonthName = monthNames[currentMonth];
export const currentYear = new Date().getFullYear();

export const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
};

export const scrollToElement = (elementId: any) => {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({
            behavior: "smooth",
            block: "start", // Cuộn trang để phần tử hiển thị ở đầu trang
            inline: "nearest" // Cuộn trang để phần tử hiển thị ở phía trên cửa sổ trình duyệt
        });
    }
};

export const stringToColor = (str: any) => {
    let hash = 0;
    let i;

    for (i = 0; i < str?.length; i += 1) {
        hash = str?.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value?.toString(16)}`?.slice(-2);
    }

    return color;
};

export const formatTime = (timeString: any) => {
    const [hours, minutes] = timeString.slice(11, 16).split(':');
    const hour = parseInt(hours, 10);
    const minute = parseInt(minutes, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minute < 10 ? '0' + minute : minute} ${ampm}`;
};

export const bgGrayColor = '#272b37'

export const normalizeText = (text: string) => {
    // Convert to lowercase first to handle both uppercase and lowercase consistently
    let result = text?.toLowerCase();

    // Replace 'đ' with 'd'
    result = result?.replace(/đ/g, 'd');

    // Normalize to 'NFD' and remove diacritical marks
    result = result?.normalize('NFD')?.replace(/[\u0300-\u036f]/g, '');

    // Remove special characters except hyphens
    result = result?.replace(/[^a-z0-9\s-]/g, '');

    // Replace whitespace or multiple hyphens with a single hyphen
    result = result?.replace(/[\s-]+/g, '-');

    // Trim leading and trailing hyphens
    result = result?.trim();

    return result;
};