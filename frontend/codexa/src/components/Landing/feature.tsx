import { Card, CardContent, CardHeader } from '../ui/card';
import { Video, Code2, Users } from 'lucide-react';
import { type ReactNode } from 'react';
import { motion} from 'framer-motion';
import type { Variants } from 'framer-motion';

// Define Props
interface CardDecoratorProps {
  children: ReactNode;
}

// Moved component definition up to fix TypeScript inference issues regarding 'children' prop
function CardDecorator({ children }: CardDecoratorProps) {
  return (
    <div 
        className="relative mx-auto size-36 duration-200 [mask-image:radial-gradient(circle,white_40%,transparent_60%)] [--color-border:rgba(9,9,11,0.1)] group-hover:[--color-border:rgba(9,9,11,0.2)] dark:[--color-border:rgba(255,255,255,0.15)] dark:group-hover:[--color-border:rgba(255,255,255,0.2)]"
    >
        <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:24px_24px] dark:opacity-50"
        />

        <div className="bg-background absolute inset-0 m-auto flex size-12 items-center justify-center border-l border-t">{children}</div>
    </div>
  );
}

export default function FeatureSection() {
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        type: "spring",
        stiffness: 50
      }
    })
  };

  return (
    <section className="bg-muted/30 py-16 md:py-32 dark:bg-transparent border-t border-border/50">
      <div className="container mx-auto max-w-5xl px-6">
        <motion.div 
          className="text-center space-y-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-balance text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Everything You Need to <span className="text-primary">Succeed</span>
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg">
            Powerful features designed to make your coding interviews seamless and productive
          </p>
        </motion.div>

        <div className="mx-auto mt-12 grid max-w-sm gap-10 md:max-w-full md:grid-cols-3 md:mt-16">
          
          <motion.div custom={0} variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <Card className="group shadow-lg shadow-black/5 dark:shadow-black/20 hover:border-primary/50 transition-colors h-full">
              <CardHeader className="pb-3 text-center">
                <CardDecorator>
                  <Video className="size-6 text-primary" aria-hidden="true" />
                </CardDecorator>
                <h3 className="mt-6 font-semibold text-lg">HD Video Call</h3>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Crystal clear video and audio for seamless communication during interviews.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div custom={1} variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <Card className="group shadow-lg shadow-black/5 dark:shadow-black/20 hover:border-primary/50 transition-colors h-full">
              <CardHeader className="pb-3 text-center">
                <CardDecorator>
                  <Code2 className="size-6 text-primary" aria-hidden="true" />
                </CardDecorator>
                <h3 className="mt-6 font-semibold text-lg">Live Code Editor</h3>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Collaborate in real-time with syntax highlighting and multiple language support.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div custom={2} variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <Card className="group shadow-lg shadow-black/5 dark:shadow-black/20 hover:border-primary/50 transition-colors h-full">
              <CardHeader className="pb-3 text-center">
                <CardDecorator>
                  <Users className="size-6 text-primary" aria-hidden="true" />
                </CardDecorator>
                <h3 className="mt-6 font-semibold text-lg">Easy Collaboration</h3>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Share your screen, discuss solutions, and learn from each other in real-time.
                </p>
              </CardContent>
            </Card>
          </motion.div>

        </div>
      </div>
    </section>
  );
}