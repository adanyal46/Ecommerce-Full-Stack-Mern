export const shortenText = (Text, n) => {
    if (Text.length > n) {
        return Text.substring(0, n).concat('...');
    }
    return Text;
}