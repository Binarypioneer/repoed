import { prisma } from './prisma';

// Generate a random 6-digit code
export function generateCode(): string {
  return Math.random().toString(10).substring(2, 8).padStart(6, '0');
}

// Send verification code via email (mock implementation)
export async function sendEmailCode(email: string): Promise<string> {
  const code = generateCode();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

  // Clean up any existing codes for this email
  await prisma.emailVerificationCode.deleteMany({
    where: { email },
  });

  // Store the code
  await prisma.emailVerificationCode.create({
    data: {
      email,
      code,
      expiresAt,
    },
  });

  // In production, use nodemailer or SendGrid to send actual email
  console.log(`📧 Email verification code for ${email}: ${code}`);
  
  // Mock: Return the code (in production, only return success)
  return code;
}

// Send verification code via SMS (mock implementation)
export async function sendPhoneCode(phone: string): Promise<string> {
  const code = generateCode();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

  // Clean up any existing codes for this phone
  await prisma.phoneVerificationCode.deleteMany({
    where: { phone },
  });

  // Store the code
  await prisma.phoneVerificationCode.create({
    data: {
      phone,
      code,
      expiresAt,
    },
  });

  // In production, use Twilio or similar to send actual SMS
  console.log(`📱 SMS verification code for ${phone}: ${code}`);
  
  // Mock: Return the code (in production, only return success)
  return code;
}

// Verify email code
export async function verifyEmailCode(email: string, code: string): Promise<boolean> {
  const record = await prisma.emailVerificationCode.findFirst({
    where: {
      email,
      code,
    },
  });

  if (!record) {
    return false;
  }

  // Check if code has expired
  if (record.expiresAt < new Date()) {
    await prisma.emailVerificationCode.delete({
      where: { id: record.id },
    });
    return false;
  }

  // Check max attempts
  if (record.attempts >= record.maxAttempts) {
    await prisma.emailVerificationCode.delete({
      where: { id: record.id },
    });
    return false;
  }

  // Valid code - delete it
  await prisma.emailVerificationCode.delete({
    where: { id: record.id },
  });

  return true;
}

// Verify phone code
export async function verifyPhoneCode(phone: string, code: string): Promise<boolean> {
  const record = await prisma.phoneVerificationCode.findFirst({
    where: {
      phone,
      code,
    },
  });

  if (!record) {
    return false;
  }

  // Check if code has expired
  if (record.expiresAt < new Date()) {
    await prisma.phoneVerificationCode.delete({
      where: { id: record.id },
    });
    return false;
  }

  // Check max attempts
  if (record.attempts >= record.maxAttempts) {
    await prisma.phoneVerificationCode.delete({
      where: { id: record.id },
    });
    return false;
  }

  // Valid code - delete it
  await prisma.phoneVerificationCode.delete({
    where: { id: record.id },
  });

  return true;
}

// Increment attempts
export async function incrementEmailAttempts(email: string, code: string): Promise<void> {
  await prisma.emailVerificationCode.updateMany({
    where: {
      email,
      code,
    },
    data: {
      attempts: { increment: 1 },
    },
  });
}

export async function incrementPhoneAttempts(phone: string, code: string): Promise<void> {
  await prisma.phoneVerificationCode.updateMany({
    where: {
      phone,
      code,
    },
    data: {
      attempts: { increment: 1 },
    },
  });
}
