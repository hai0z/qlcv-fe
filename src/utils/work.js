export const calulateWorkProgress = (work) => {
  let completed = 0;
  let totalRequests = 0;
  if (work?.implementer.length === 0) return 0;
  for (let i = 0; i < work?.implementer.length; i++) {
    for (let j = 0; j < work?.implementer[i].request.length; j++) {
      totalRequests++;
      if (work.implementer[i].request[j].isCompleted) {
        completed++;
      }
    }
  }
  if (totalRequests === 0) return 0;
  return (completed / totalRequests) * 100;
};

export function workStatusEnumToString(status) {
  switch (status) {
    case "IN_PROGRESS":
      return "Đang thực hiện";
    case "COMPLETED":
      return "Đã hoàn thành";
    case "PAUSE":
      return "Đang tạm dừng";
    case "PENDING":
      return "Chờ duyệt";
  }
}

export const workStatusColor = (workStatus) => {
  switch (workStatus) {
    case "IN_PROGRESS":
      return "primary";
    case "COMPLETED":
      return "success";
    case "PAUSE":
      return "warning";
    case "PENDING":
      return "secondary";
  }
};

export const getEventColor = (workStatus) => {
  switch (workStatus) {
    case "IN_PROGRESS":
      return "hsl(var(--nextui-primary))";
    case "COMPLETED":
      return "hsl(var(--nextui-success))";
    case "PAUSE":
      return "hsl(var(--nextui-warning))";
    case "PENDING":
      return "hsl(var(--nextui-secondary))";
  }
};
