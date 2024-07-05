"use client"

import { Badge } from "@/components/ui/badge"
import { BorderBeam } from "../magicui/border-beam"
import { useContext } from "react";
import { Skeleton } from "@/components/ui/skeleton"
import { BioContext } from '@/context/BioContext';
import { CopyText } from "./CopyText";

const OutputBox = () => {

  const {output, loading} = useContext(BioContext)
  
  return (
    <div className="relative flex min-h-[50vh] mt-2 flex-col rounded-xl bg-muted/50 backdrop-blur-sm overflow-hidden border border-primary/5">
      {loading && <BorderBeam size={1200} borderWidth={1.5} duration={4} className="z-10" />}
      <Badge className="absolute top-3 right-3 z-50" variant="outline">Output</Badge>

      {
        loading?

         <Skeleton className="w-full h-full" /> :

        <ul className="flex flex-col items-start justify-start space-y-12 p-16">
          {
            output?.data.map((data, index) => (
              <li key={index} className="w-full text-base border border-primary/20 rounded-md p-4 relative bg-background"> 
                {data.bio}
                <span className="absolute top-[99%] right-0">
                  <CopyText text={data.bio}/>
                </span>
              </li>

            ))
          }
        </ul>
      }

    </div>
  )
}

export default OutputBox