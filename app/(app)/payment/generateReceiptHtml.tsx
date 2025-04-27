import logo from '@/assets/logo.png';
import { Check, Download } from 'lucide-react';
const generateReceiptHtml = ({
	id,
	amount,
	status,
	name,
	date,
}: {
	amount: number;
	id: string;
	status: string;
	name: string;
	date: string;
}) => {
	console.log('id', id);
	const formattedDate = new Date(date);
	`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Gates Transaction Receipt</title>
</head>
<body style="font-family: 'Segoe UI', sans-serif; background: #f9f9f9; padding: 40px;">
		<div
			style={{
				minHeight: '100vh',
				backgroundColor: '#f9fafb',
				padding: '48px 16px',
			}}
		>
			{/* Header */}
			<div
				style={{
					maxWidth: '28rem',
					margin: '0 auto',
					display: 'flex',
					alignItems: 'center',
					marginBottom: '24px',
				}}
			>
				<button
					style={{
						background: 'none',
						border: 'none',
						color: '#1f2937',
						fontSize: '24px',
						cursor: 'pointer',
					}}
					onClick={() => window.history.back()}
				>
					←
				</button>
				<h1
					style={{
						flex: 1,
						textAlign: 'center',
						fontSize: '20px',
						fontWeight: '600',
					}}
				>
					Receipt
				</h1>
			</div>

			{/* Receipt Card */}
			<div
				style={{
					maxWidth: '28rem',
					margin: '0 auto',
					background: 'white',
					borderRadius: '16px',
					padding: '24px',
					boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
				}}
			>
				{/* Success Icon */}
				<div
					style={{
						display: 'flex',
						justifyContent: 'center',
						marginBottom: '16px',
					}}
				>
					<Check
						size={32}
						color="#22c55e"
						style={{
							padding: '16px',
							background: '#dcfce7',
							borderRadius: '50%',
						}}
					/>
				</div>

				{/* Success Message */}
				<p
					style={{
						textAlign: 'center',
						fontSize: '18px',
						fontWeight: '500',
						marginBottom: '32px',
					}}
				>Transaction ${
						status !== 'paid' ? 'Invoice' : 'Receipt'
					}</p>

				{/* Receipt Details */}
				<div style={{ marginBottom: '24px' }}>
					{[
						'References Number',
						'Date',
						'Time',
						'Payment Method',
						'Amount',
					].map((label, index) => (
						<div
							key={label}
							style={{
								display: 'flex',
								justifyContent: 'space-between',
								marginBottom: '16px',
								...(label === 'Amount'
									? {
											borderTop: '1px dashed #e5e7eb',
											paddingTop: '16px',
									  }
									: {}),
							}}
						>
							<span style={{ color: '#4b5563' }}>{label}</span>
							<span style={{ fontWeight: '500' }}>
								{index === 0 && ${id}}
								{index === 1 && ${formattedDate}}
								{index === 2 && '5:49 AM'}
								{index === 3 && 'Debit Card'}
								{index === 4 && '₦${amount}.00'}
							</span>
						</div>
					))}
				</div>

				{/* QR Code Section */}
				<div style={{ position: 'relative', margin: '32px 0 16px' }}>
					<div
						style={{
							position: 'absolute',
							top: '50%',
							width: '100%',
							borderTop: '1px dashed #e5e7eb',
						}}
					/>
					<div
						style={{
							position: 'relative',
							height: '32px',
							width: '32px',
							background: '#f9fafb',
							transform: 'rotate(-45deg)',
							margin: '0 auto',
						}}
					/>
				</div>

				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						gap: '8px',
						background: '#f9fafb',
						padding: '24px',
						borderRadius: '12px',
					}}
				>
					<img
						src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=7851"
						alt="QR Code"
						style={{
							height: '128px',
							width: '128px',
						}}
					/>
					<span
						style={{
							fontSize: '14px',
							fontWeight: '500',
							color: '#1f2937',
						}}
					>
						7851
					</span>
					<span
						style={{
							fontSize: '14px',
							color: '#4b5563',
						}}
					>
						Scan code for gate way pass
					</span>
				</div>
			</div>
		</div>;
		</body>`;
};

export default generateReceiptHtml;
