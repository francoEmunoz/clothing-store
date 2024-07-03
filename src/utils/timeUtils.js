export const calculateTimeAgo = (createdAt) => {
    const currentTime = new Date();
    const commentTime = new Date(createdAt);
    const difference = currentTime.getTime() - commentTime.getTime();
    const seconds = Math.floor(difference / 1000);
    if (seconds < 60) {
        return `${seconds} segundos`;
    }
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) {
        return `${minutes} minutos`;
    }
    const hours = Math.floor(minutes / 60);
    if (hours < 24) {
        return `${hours} horas`;
    }
    const days = Math.floor(hours / 24);
    return `${days} días`;
};