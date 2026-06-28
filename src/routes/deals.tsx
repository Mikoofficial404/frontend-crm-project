import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useDeals, useUpdateDealStage } from "@/lib/api/deals";
import { createFileRoute } from "@tanstack/react-router";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import type { DropResult } from "@hello-pangea/dnd";
import type { Deal } from "@/types";

export const Route = createFileRoute("/deals")({
  component: DealsPage,
});

const STAGES = ["PROSPECTING", "NEGOTIATION", "WON", "LOST"];

function DealsPage() {
  const { data, isLoading } = useDeals(1, 50);
  const { mutate: updateDealStage } = useUpdateDealStage();

  const [localDeals, setLocalDeals] = useState<Deal[]>([]);

  useEffect(() => {
    if (data?.data) {
      setLocalDeals(data.data);
    }
  }, [data?.data]);

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const newStage = destination.droppableId;

    setLocalDeals((prev) =>
      prev.map((deal) =>
        deal.id === draggableId ? { ...deal, stage: newStage } : deal,
      ),
    );

    updateDealStage({ dealId: draggableId, stage: newStage });
  };

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="animate-pulse flex gap-6 overflow-x-auto pb-4 w-full">
          {STAGES.map((s) => (
            <div
              key={s}
              className="min-w-[300px] h-[500px] bg-muted/30 rounded-xl"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="flex gap-6 overflow-x-auto pb-4 items-start min-h-[calc(100vh-12rem)] custom-scrollbar">
        {STAGES.map((stage) => (
          <Droppable key={stage} droppableId={stage}>
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={`min-w-[320px] w-[320px] p-4 rounded-2xl flex flex-col gap-4 border transition-colors ${
                  snapshot.isDraggingOver
                    ? "bg-primary/5 border-primary/20"
                    : "bg-muted/30 border-transparent"
                }`}
              >
                <div className="flex items-center justify-between mb-2 px-1">
                  <h3 className="font-bold tracking-tight text-sm text-foreground/80">
                    {stage}
                  </h3>
                  <span className="bg-background text-xs font-semibold px-2.5 py-1 rounded-full text-muted-foreground border">
                    {localDeals.filter((d) => d.stage === stage).length}
                  </span>
                </div>

                <div className="flex flex-col gap-3 min-h-[150px]">
                  {localDeals
                    .filter((deal) => deal.stage === stage)
                    .map((deal, index) => (
                      <Draggable
                        key={deal.id}
                        draggableId={deal.id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={{
                              ...provided.draggableProps.style,
                            }}
                          >
                            <Card
                              className={`transition-all duration-200 group border-border/50 ${
                                snapshot.isDragging
                                  ? "shadow-lg scale-[1.02] rotate-1 ring-1 ring-primary/30 z-50 cursor-grabbing"
                                  : "hover:shadow-md hover:border-primary/20 cursor-grab"
                              }`}
                            >
                              <CardContent className="p-4 flex flex-col gap-1.5">
                                <p className="font-semibold text-sm leading-tight text-foreground group-hover:text-primary transition-colors">
                                  {deal.name || deal.title}
                                </p>
                                <p className="text-xs font-medium text-muted-foreground flex items-center gap-1.5 before:content-[''] before:block before:w-1.5 before:h-1.5 before:rounded-full before:bg-green-500/80">
                                  $
                                  {typeof deal.value === "number"
                                    ? deal.value.toLocaleString()
                                    : deal.value}
                                </p>
                              </CardContent>
                            </Card>
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
}
