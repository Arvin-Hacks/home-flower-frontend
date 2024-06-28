// src/components/Dialog.tsx
import React, { ReactNode } from 'react';
import { Dialog as ShadDialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose, DialogFooter, DialogTrigger } from '../ui/dialog';
import { Button } from '../ui/button';


interface DialogProps {
    triggerLabel: string;
    title?: string;
    description?: string;
    children: ReactNode;
    footer?: ReactNode;
    triggerVariant?: string; // Optional variant prop for trigger button
}

const Dialog: React.FC<DialogProps> = ({
    triggerLabel,
    title,
    description,
    children,
    footer,
    triggerVariant = "outline"
}) => {
    return (
        <ShadDialog>
            <DialogTrigger asChild>
                <Button variant="destructive">{triggerLabel}</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    {title && <DialogTitle>{title}</DialogTitle>}
                    {description && <DialogDescription>{description}</DialogDescription>}
                </DialogHeader>
                <div className="mt-4">{children}</div>
                {footer ? <DialogFooter className="mt-4">{footer}</DialogFooter> :
                    <DialogFooter className="mt-4">
                        <DialogClose asChild>
                            <Button variant="secondary">Close</Button>
                        </DialogClose>
                    </DialogFooter>}
            </DialogContent>
        </ShadDialog>
    );
};

export default Dialog;

