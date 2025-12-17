import { Button } from '../ui/button';
import { 
  Play, 
  Globe2, 
  CheckCircle2, 
} from 'lucide-react';
import HeroVisual from './hero-visual';
import { motion} from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Link } from 'react-router-dom';

interface HeroSectionProps {
  onOpenModal: () => void;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 50 },
  },
};

export default function HeroSection({ onOpenModal }: HeroSectionProps) {
  return (
    <section className="relative w-full overflow-hidden bg-background py-10">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none z-0">
        <div className="absolute top-[-20%] right-[-10%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-primary/10 rounded-full blur-[80px] md:blur-[120px]" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[250px] md:w-[500px] h-[250px] md:h-[500px] bg-primary/5 rounded-full blur-[60px] md:blur-[100px]" />
      </div>

      <div className="container relative z-10 px-4 md:px-6 max-w-7xl mx-auto">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          
          {/* Text Content */}
          <motion.div 
            className="flex flex-col justify-center space-y-6 md:space-y-8 text-center lg:text-left items-center lg:items-start"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="space-y-4 w-full">
              <motion.div variants={itemVariants} className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs md:text-sm font-medium text-primary w-fit mx-auto lg:mx-0">
                <Globe2 className="mr-2 h-3 w-3 md:h-3.5 md:w-3.5" />
                Real-time Collaboration
              </motion.div>
              <motion.h1 variants={itemVariants} className="text-3xl font-extrabold tracking-tight sm:text-5xl md:text-6xl xl:text-7xl leading-tight">
                Code Together, <br />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-orange-400">
                  Learn Together
                </span>
              </motion.h1>
              <motion.p variants={itemVariants} className="max-w-[600px] mx-auto lg:mx-0 text-muted-foreground text-sm sm:text-base md:text-xl leading-relaxed">
                The ultimate platform for collaborative coding interviews and pair programming. 
                Connect face-to-face, code in real-time, and ace your technical interviews.
              </motion.p>
            </div>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 w-full justify-center lg:justify-start px-4 sm:px-0">
              <Link to="/signup">
              <Button 
                size="lg" 
                className="h-11 md:h-12 px-8 text-base shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300 w-full sm:w-auto" 
                onClick={onOpenModal}
              >
                Start Coding Now
              </Button>
              </Link>
              <Button variant="outline" size="lg" className="h-11 md:h-12 px-8 text-base border-border bg-transparent hover:bg-accent/50 group w-full sm:w-auto">
                <Play className="mr-2 h-4 w-4 fill-current group-hover:text-primary transition-colors" />
                Watch Demo
              </Button>
            </motion.div>

            <motion.div variants={itemVariants} className="flex items-center justify-center lg:justify-start gap-6 md:gap-8 pt-4 border-t border-border/40 w-full">
              <div className="flex flex-col items-center lg:items-start">
                <span className="text-xl md:text-2xl font-bold text-foreground">10K+</span>
                <span className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-wider font-semibold">Active Users</span>
              </div>
              <div className="flex flex-col items-center lg:items-start">
                <span className="text-xl md:text-2xl font-bold text-foreground">50K+</span>
                <span className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-wider font-semibold">Sessions</span>
              </div>
              <div className="flex flex-col items-center lg:items-start">
                <span className="text-xl md:text-2xl font-bold text-primary">99.9%</span>
                <span className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-wider font-semibold">Uptime</span>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-wrap justify-center lg:justify-start gap-x-4 gap-y-2 text-xs md:text-sm text-muted-foreground pt-2">
              <div className="flex items-center gap-1.5">
                 <CheckCircle2 className="h-3.5 w-3.5 md:h-4 md:w-4 text-primary" />
                 <span>Live Video Chat</span>
              </div>
              <div className="flex items-center gap-1.5">
                 <CheckCircle2 className="h-3.5 w-3.5 md:h-4 md:w-4 text-primary" />
                 <span>Code Editor</span>
              </div>
              <div className="flex items-center gap-1.5">
                 <CheckCircle2 className="h-3.5 w-3.5 md:h-4 md:w-4 text-primary" />
                 <span>Multi-Language</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Hero Image / Visual Representation */}
          <div className="w-full max-w-[500px] lg:max-w-none mx-auto mt-8 lg:mt-0">
             <HeroVisual />
          </div>
        </div>
      </div>
    </section>
  );
}