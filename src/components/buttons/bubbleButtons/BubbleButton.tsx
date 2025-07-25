export default function BubbleButton({
    onClick,
    text,
    bg = "bg-primary",
}: {
    onClick?: () => void;
    text: string;
    bg?: string;
}) {
    return (
        <button
            onClick={onClick}
            className={"inline-block rounded-full text-sm cursor-pointer hover:scale-110 px-5 py-2 duration-100 " + bg}
        >
            {text}
        </button>
    );
}
