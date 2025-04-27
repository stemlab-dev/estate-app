 interface IDue {
    id: string; // Unique identifier for the due
    name: string; // Name of the due
    status: string; // Status of the due (e.g., "completed", "pending")
  }
  
 interface IPayment {
    id: string; // Unique identifier for the payment
    dueId: IDue; // Nested due object
    createdAt: string; // Date when the payment was created (ISO format)
  }
  