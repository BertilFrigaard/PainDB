export default function SmallButtonSecondary({ onClick, text }: { onClick?: () => void; text: string }) {
    return (
        <button
            onClick={onClick}
            className="border-1 border-secondary rounded-xl px-5 py-1 flex items-center gap-1 animating-button hover:bg-gray-200"
        >
            {text}
        </button>
    );
}
