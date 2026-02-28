import { Link } from "react-router-dom";
import { Button } from "../../components/ui/Button";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0A1A2F] to-black px-4 overflow-hidden">

      {/* Background glow */}
      <div className="absolute -top-24 -left-24 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative text-center max-w-lg"
      >
        {/* Code */}
        <h1 className="text-7xl font-extrabold bg-gradient-to-r from-white to-blue-300 bg-clip-text text-transparent mb-6">
          404
        </h1>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-white mb-3">
          Page introuvable
        </h2>

        {/* Description */}
        <p className="text-slate-300 text-sm leading-relaxed mb-8">
          La page que vous recherchez n'existe pas ou a été déplacée.
          Vérifiez l’URL ou revenez à l’accueil.
        </p>

        {/* Action */}
        <Link to="/">
          <Button size="lg">
            Retour à l'accueil
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}