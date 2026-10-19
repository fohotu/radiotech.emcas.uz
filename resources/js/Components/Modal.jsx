import { useEffect } from 'react';
import { X } from 'lucide-react';

export default function Modal({
    show,
    onClose,
    title,
    children,
    maxWidth = 'max-w-lg',
}) {
    useEffect(() => {
        if (!show) return;

        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'hidden';

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
        };
    }, [show, onClose]);

    if (!show) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 p-4 backdrop-blur-sm"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) {
                    onClose();
                }
            }}
        >
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
                className={`w-full ${maxWidth} overflow-hidden rounded-2xl bg-white shadow-2xl`}
            >
                <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
                    <h2
                        id="modal-title"
                        className="text-lg font-semibold text-gray-900"
                    >
                        {title}
                    </h2>

                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Закрыть"
                        className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6">
                    {children}
                </div>
            </div>
        </div>
    );
}