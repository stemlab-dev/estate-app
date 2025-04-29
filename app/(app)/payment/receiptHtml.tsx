import logo from '@/assets/logo.png';
import { Check, Download } from 'lucide-react';
const receiptHtml = ({
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
	return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Gates Transaction Receipt</title>
</head>
<body style="font-family: 'Segoe UI', sans-serif; background: #f9f9f9; padding: 40px;">
  <div style="max-width: 500px; margin: auto; background: #fff; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1); padding: 30px;">
    <div style="text-align: center; margin-bottom: 30px;">
      <img src="https://res.cloudinary.com/dc8wi0sjs/image/upload/v1745938000/logos/idyqhrvfz1zexlnkxqk3.png" alt="Xstate Logo" style="width: 100px;">
      <h2 style="color: #333;">Transaction ${
				status !== 'paid' ? 'Invoice' : 'Receipt'
			}</h2>
    </div>
    
    <h3 style="color: green; text-align: center;">₦${amount}.00</h3>
    <p style="text-align: center; font-size: 16px; color: #4CAF50;">Successful</p>
    <p style="text-align: center; font-size: 14px; color: #888;">${formattedDate}</p>

    <hr style="margin: 20px 0;">

    <div style="font-size: 15px; line-height: 1.6;">
      <strong>Recipient Details: </strong>
      ${name}
    </div>

    <div style="font-size: 15px; line-height: 1.6; margin-top: 15px;">
      <strong>Transaction status: </strong>
      ${status}
    </div>

    <div style="font-size: 15px; line-height: 1.6; margin-top: 15px;">
      <strong>Transaction No: </strong>
      ${id}
    </div>


    <hr style="margin: 30px 0;">
    <div style="text-align: center;	margin: 15px 0 auto, display: flex, align-items: center, justify-content: center, width: 100%;">
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
      <img
        src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=7851"
        alt="QR Code"
        style={{
          height: '128px',
          width: '128px',
          margin: auto,
        }}
      />
      <p
        style={{
          fontSize: '14px',
          color: '#4b5563',
          margin: 0 auto,
          fontWeight: '500',
          text-align: center;
        }}
      >
        Scan code for gate way pass
      </p>
    </div>
	</div>
</body>
</html>
`;
};

export default receiptHtml;
