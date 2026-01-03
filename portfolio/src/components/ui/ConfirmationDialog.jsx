import React from 'react';
import Modal from './Modal';
import { Button } from './Button';

const ConfirmationDialog = ({
    isOpen,
    onClose,
    onConfirm,
    title = "Confirm Action",
    description = "Are you sure you want to proceed? This action cannot be undone.",
    confirmText = "Confirm",
    cancelText = "Cancel",
    variant = "danger", // danger | primary
    isLoading = false
}) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title={title}>
            <p className="mb-8 text-slate-600">
                {description}
            </p>

            <div className="flex justify-end gap-3">
                <Button
                    variant="outline"
                    onClick={onClose}
                    disabled={isLoading}
                >
                    {cancelText}
                </Button>
                <Button
                    variant={variant === 'danger' ? 'primary' : 'secondary'} // Using primary for danger in this design system (dark blue) or update button variants
                    className={variant === 'danger' ? "bg-red-600 hover:bg-red-700 border-red-600" : ""}
                    onClick={onConfirm}
                    disabled={isLoading}
                >
                    {isLoading ? 'Processing...' : confirmText}
                </Button>
            </div>
        </Modal>
    );
};

export default ConfirmationDialog;
