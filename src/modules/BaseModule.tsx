export const handleImageError = (e: any) => {
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

