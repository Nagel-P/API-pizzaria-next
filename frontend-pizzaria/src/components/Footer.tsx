// src/components/Footer.tsx
export default function Footer() {
    return (
      <footer className="bg-gray-100 text-center p-4 mt-10">
        <p className="text-sm text-gray-600">
          © {new Date().getFullYear()} doublepizzas pizzaria. Todos os direitos reservados.
        </p>
      </footer>
    );
  }
  