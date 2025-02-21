import { useState } from 'react'
import { Button } from '../components/Button'
import { Card } from '../components/Cards'
import { CreateContentModal } from '../components/CreateContentModal'
import { PlusIcon } from '../icons/PlusIcon'
import { ShareIcon } from '../icons/ShareIcon'
import { Sidebar } from '../components/Sidebar'

function Dashboard() {

  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <Sidebar />  
      <div className="p-4 ml-72 min-h-screen bg-secondary-1">

        <CreateContentModal open={modalOpen} onClose={() => {setModalOpen(false)}} />

        <div className="flex justify-end gap-3 ">
          <Button onClick={() => {setModalOpen(true);}} variant="primary" text="Add content" startIcon={<PlusIcon />}></Button>
          <Button variant="secondary" text="Share Brain" startIcon={<ShareIcon />}></Button>
        </div>

        <div className="flex">
          <div>
            <Card type="twitter" link="https://x.com/elonmusk/status/1887867644814020902" title="First tweet"/>
          </div>
          <div>
            <Card type="youtube" link="https://www.youtube.com/watch?v=dW9Wg7eXRUg" title="First youtube"/>
          </div>
        </div>
        
      </div>
    </>
  )
}

export default Dashboard;