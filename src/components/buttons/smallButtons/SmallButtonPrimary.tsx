export default function SmallButtonPrimary({ onClick, text }: { onClick?: () => void; text: string }) {
    return (
        <button
            onClick={onClick}
            className="bg-primary rounded-xl text-white px-5 py-1 animating-button hover:bg-primary/90 flex items-center gap-1"
        >
            {text}
        </button>
    );
}
