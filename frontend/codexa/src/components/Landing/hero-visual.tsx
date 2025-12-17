import { 
  Code2, 
  FileCode2,
  MonitorPlay,
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function HeroVisual() {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 50, rotateY: -5 }}
      animate={{ opacity: 1, x: 0, rotateY: 0 }}
      transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 50 }}
      className="relative mx-auto w-full max-w-[500px] lg:max-w-none"
    >
      {/* Main Container mimicking a tilted screen/app interface */}
      <div className="relative z-10 perspective-1000">
         <div className="relative rounded-xl border border-border/50 bg-card/80 backdrop-blur-sm shadow-2xl transition-all duration-500 hover:scale-[1.01] overflow-hidden">
            
            {/* Fake Browser Toolbar */}
            <div className="flex items-center gap-2 border-b border-border/50 bg-muted/50 px-4 py-3">
              <div className="flex gap-1.5 shrink-0">
                <div className="h-3 w-3 rounded-full bg-red-500/80" />
                <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                <div className="h-3 w-3 rounded-full bg-green-500/80" />
              </div>
              <div className="mx-auto flex w-full max-w-[200px] sm:max-w-xs items-center justify-center rounded-md bg-background/50 py-1 text-[10px] sm:text-xs text-muted-foreground font-mono truncate px-2">
                codexa.com/room/xyz-123
              </div>
              <div className="w-10 sm:w-12 shrink-0" /> {/* Spacer */}
            </div>

            {/* Editor Interface */}
            {/* Responsive grid: Stack on mobile, side-by-side on sm+ */}
            <div className="grid grid-cols-1 md:grid-cols-[1fr_280px] h-auto md:h-[400px]">
              
              {/* Code Area */}
              <div className="border-r border-border/50 bg-background/90 p-4 font-mono text-xs sm:text-sm min-h-[250px] md:min-h-auto overflow-x-auto">
                <div className="flex items-center justify-between mb-4 text-muted-foreground text-[10px] sm:text-xs border-b border-border/30 pb-2">
                   <span>main.tsx</span>
                   <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"/> Live</span>
                </div>
                <div className="space-y-1 min-w-[300px]"> {/* min-w ensures code doesn't wrap weirdly on very small screens */}
                  <div className="flex">
                     <span className="w-6 text-muted-foreground/50 select-none">1</span>
                     <span className="text-pink-500">import</span> <span className="text-foreground ml-1">React</span> <span className="text-pink-500 ml-1">from</span> <span className="text-green-400 ml-1">'react'</span>;
                  </div>
                  <div className="flex">
                     <span className="w-6 text-muted-foreground/50 select-none">2</span>
                  </div>
                  <div className="flex">
                     <span className="w-6 text-muted-foreground/50 select-none">3</span>
                     <span className="text-purple-400">function</span> <span className="text-blue-400 ml-1">App</span>() {'{'}
                  </div>
                  <div className="flex">
                     <span className="w-6 text-muted-foreground/50 select-none">4</span>
                     <span className="pl-4 text-pink-500">return</span> (
                  </div>
                  <div className="flex bg-primary/10 -mx-4 px-4 border-l-2 border-primary">
                     <span className="w-6 text-muted-foreground/50 select-none">5</span>
                     <span className="pl-8 text-foreground">{'<'}</span><span className="text-blue-400">HeroSection</span>
                  </div>
                   <div className="flex bg-primary/10 -mx-4 px-4 border-l-2 border-primary relative">
                     <span className="w-6 text-muted-foreground/50 select-none">6</span>
                     <span className="pl-12 text-cyan-400">title</span>=<span className="text-green-400">"Code Together"</span>
                     
                     {/* Collaborative Cursor - Responsive Positioning */}
                     <motion.div 
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="absolute left-[200px] sm:left-[240px] top-0 h-5 w-0.5 bg-orange-500 z-10"
                      >
                        <div className="absolute -top-4 -left-2 bg-orange-500 text-[8px] sm:text-[10px] text-white px-1.5 rounded-sm whitespace-nowrap">
                          Alex
                        </div>
                     </motion.div>
                  </div>
                  <div className="flex bg-primary/10 -mx-4 px-4 border-l-2 border-primary">
                     <span className="w-6 text-muted-foreground/50 select-none">7</span>
                     <span className="pl-8 text-foreground">{'/>'}</span>
                  </div>
                  <div className="flex">
                     <span className="w-6 text-muted-foreground/50 select-none">8</span>
                     <span className="pl-4">);</span>
                  </div>
                  <div className="flex">
                     <span className="w-6 text-muted-foreground/50 select-none">9</span>
                     <span>{'}'}</span>
                  </div>
                </div>
              </div>

              {/* Sidebar / Video / Chat Mock - Now visible on mobile, stacked */}
              <div className="bg-muted/10 p-3 flex flex-col sm:flex-row md:flex-col gap-3 border-t md:border-t-0 md:border-l border-border/50">
                 {/* Videos Container */}
                 <div className="flex gap-3 md:contents overflow-x-auto pb-1 md:pb-0">
                   <div className="aspect-video w-full min-w-[140px] md:min-w-0 rounded-lg bg-zinc-800 relative overflow-hidden ring-1 ring-border/50 shrink-0">
                      <img src="https://picsum.photos/300/200?random=1" className="w-full h-full object-cover opacity-80" alt="User 1" />
                      <div className="absolute bottom-2 left-2 text-[10px] text-white bg-black/50 px-1 rounded">You</div>
                      <div className="absolute top-2 right-2 h-2 w-2 rounded-full bg-green-500 shadow-[0_0_10px_#22c55e]" />
                   </div>
                   <div className="aspect-video w-full min-w-[140px] md:min-w-0 rounded-lg bg-zinc-800 relative overflow-hidden ring-1 ring-border/50 shrink-0">
                      <img src="https://picsum.photos/300/200?random=2" className="w-full h-full object-cover opacity-80" alt="User 2" />
                      <div className="absolute bottom-2 left-2 text-[10px] text-white bg-black/50 px-1 rounded">Alex</div>
                   </div>
                 </div>

                 {/* Chat Mock */}
                 <div className="flex-1 rounded-lg bg-background border border-border/50 p-2 hidden sm:block">
                    <div className="text-[10px] text-muted-foreground font-semibold mb-2 uppercase">Chat</div>
                    <div className="space-y-2 text-[10px] md:text-xs">
                       <div className="flex gap-2">
                          <div className="font-bold text-primary shrink-0">Alex:</div>
                          <div className="text-muted-foreground truncate">Optimize line 6?</div>
                       </div>
                       <div className="flex gap-2">
                          <div className="font-bold shrink-0">You:</div>
                          <div className="text-muted-foreground truncate">Sure!</div>
                       </div>
                    </div>
                 </div>
              </div>
            </div>
         </div>

         {/* Floating Elements (Badges) - Hidden on very small screens to avoid clutter */}
         <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -left-4 top-12 hidden md:block"
         >
            <div className="flex items-center gap-2 rounded-lg border border-border bg-card/90 p-2 md:p-3 shadow-xl backdrop-blur-md">
               <div className="rounded bg-orange-500/20 p-2 text-orange-500">
                  <FileCode2 className="h-4 w-4 md:h-6 md:w-6" />
               </div>
               <div className="flex flex-col">
                  <span className="text-xs font-bold">HTML5</span>
               </div>
            </div>
         </motion.div>

         <motion.div 
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -right-6 bottom-32 hidden lg:block"
         >
            <div className="flex items-center gap-2 rounded-lg border border-border bg-card/90 p-3 shadow-xl backdrop-blur-md">
               <div className="rounded bg-blue-500/20 p-2 text-blue-500">
                  <Code2 className="h-6 w-6" />
               </div>
               <div className="flex flex-col">
                  <span className="text-xs font-bold">React</span>
               </div>
            </div>
         </motion.div>

         <motion.div 
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute -bottom-4 md:-bottom-8 left-4 md:left-12 hidden md:block"
         >
            <div className="flex items-center gap-2 rounded-lg border border-border bg-card/90 p-2 md:p-3 shadow-xl backdrop-blur-md">
               <div className="rounded bg-primary/20 p-2 text-primary">
                  <MonitorPlay className="h-4 w-4 md:h-6 md:w-6" />
               </div>
               <div className="flex flex-col">
                  <span className="text-xs font-bold">Live</span>
               </div>
            </div>
         </motion.div>
      </div>

      {/* Background Abstract Shapes */}
      <div className="absolute -top-12 -right-12 h-48 w-48 md:h-64 md:w-64 rounded-full bg-primary/20 blur-3xl opacity-50 md:opacity-100" />
      <div className="absolute -bottom-12 -left-12 h-48 w-48 md:h-64 md:w-64 rounded-full bg-blue-500/20 blur-3xl opacity-50 md:opacity-100" />
      
    </motion.div>
  );
}