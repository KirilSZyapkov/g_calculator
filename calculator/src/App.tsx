import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Instructions from "./components/Instructions"
import Calculator from "./components/Calculator"

function App() {

  return (
    <>
      <h1 className="text-white text-3xl font-bold text-center tracking-widest mb-16 md:mb-5">Доместик Варна</h1>
      <Tabs defaultValue="tab1" className="max-w-4xl mx-auto">
        <TabsList className="w-full flex flex-col pb-16 lg:flex-row lg:pb-0 items-center gap-2">
          <TabsTrigger value="tab1"
            className="w-full text-center text-xl p-6 mb-5 rounded-md hover:bg-gray-500 bg-gray-200 focus:outline-none cursor-pointer">Инструкции за ползване</TabsTrigger>
          <TabsTrigger value="tab2"
            className="w-full text-center text-xl p-6 mb-5 rounded-md hover:bg-gray-500 bg-gray-200 focus:outline-none cursor-pointer">Калкулатор</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">
          <Instructions />
        </TabsContent>
        <TabsContent value="tab2">
          <Calculator />
        </TabsContent>
      </Tabs>
    </>
  )
}

export default App

