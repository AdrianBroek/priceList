export default function copyToClipboard(text) {
    // Copy the text inside the text field
    navigator.clipboard.writeText(text);
}