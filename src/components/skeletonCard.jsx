import { Skeleton, Card, CardBody } from "@nextui-org/react";
import React from "react";

function SkeletonCard() {
  return (
    <Card className="w-full my-8 py-8 min-h-40">
      <CardBody className="px-3 py-0 text-small text-default-400 flex flex-row p-6 gap-8 h-full">
        <div className="max-w-[300px] w-full flex items-center gap-3">
          <div>
            <Skeleton className="flex rounded-full w-12 h-12" />
          </div>
          <div className="w-full flex flex-col gap-2">
            <Skeleton className="h-3 w-3/5 rounded-lg" />
            <Skeleton className="h-3 w-4/5 rounded-lg" />
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

export default SkeletonCard;
