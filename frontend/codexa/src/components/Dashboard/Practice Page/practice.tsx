import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "../sidebar";
import { PracticeProblems } from "./practice-problems";
import { DashboardHeader } from "../dashboard-header";

export function PracticePage() {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="w-full">
                <DashboardHeader subHeader="DevPractice Dashboard"/>
                <PracticeProblems />
            </main>
        </SidebarProvider>
    );
}