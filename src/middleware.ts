import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  // Ελέγχουμε αν ο χρήστης προσπαθεί να μπει στο /admin
  if (req.nextUrl.pathname.startsWith("/admin")) {
    const authHeader = req.headers.get("authorization");

    if (authHeader) {
      // Το header έρχεται στη μορφή "Basic base64encodedstring"
      const authValue = authHeader.split(" ")[1];
      // Αποκωδικοποίηση από base64
      const [user, pwd] = atob(authValue).split(":");

      // ΕΔΩ ΟΡΙΖΕΙΣ ΤΟΥΣ ΚΩΔΙΚΟΥΣ ΣΟΥ (Θα τους πάρει από το .env)
      const validUser = process.env.ADMIN_USER;
      const validPass = process.env.ADMIN_PASSWORD;

      if (user === validUser && pwd === validPass) {
        return NextResponse.next();
      }
    }

    // Αν δεν δώσει σωστούς κωδικούς, επιστρέφουμε 401 και ζητάμε login
    return new NextResponse("Authentication required", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Secure Admin Area"',
      },
    });
  }

  return NextResponse.next();
}

// Ορίζουμε σε ποιες διαδρομές θα τρέχει το middleware
export const config = {
  matcher: "/admin/:path*",
};