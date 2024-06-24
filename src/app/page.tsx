import Form from "@/app/components/form/form"
import HomeFooter from "@/app/components/home-footer/HomeFooter"
import List from "@/app/components/list/list"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center gap-24 p-24">
      <Form />
      <List />
      <HomeFooter />
    </div>
  )
}
