'use client'
import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'

export function ConfirmationDialog({
	title,
	description,
	confirmText = 'Confirm',
	cancelText = 'Cancel',
	onConfirm,
	onCancel,
	children,
	open,
	setOpen,
	destructive,
	reject = false,
	reason,
	setReason,
}) {
	const handleConfirm = () => {
		onConfirm()
		setOpen(false)
	}

	const handleCancel = () => {
		if (onCancel) {
			onCancel()
		}
		setOpen(false)
	}
	const handleReject = () => {
		setReason(event.target.value)
	}
	return (
		<Dialog open={open} onOpenChange={setOpen} modal>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent className='sm:max-w-[425px]'>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					<DialogDescription>{description}</DialogDescription>
				</DialogHeader>
				{reject && (
					<div>
						<Label>Reason for rejection</Label>
						<Input
							name='reason'
							placeholder='Reason for rejection'
							autocomplete='off'
							value={reason}
							onChange={handleReject}
						></Input>
					</div>
				)}
				<DialogFooter>
					<Button variant='outline' onClick={handleCancel}>
						{cancelText}
					</Button>
					{destructive ? (
						<Button variant='destructive' onClick={handleConfirm}>
							{confirmText}
						</Button>
					) : (
						<Button onClick={handleConfirm}>{confirmText}</Button>
					)}
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
