export const greeting = () => {
  const hours = new Date().getHours();
  if (hours >= 6 && hours < 12) return "Good Morning";
  if (hours >= 12 && hours < 18) return "Good Afternoon";
  return "Good Evening";
};

export const filterData = (
  users: any,
  searchText: string,
  category: string,
  setFilteredUsers: (users: any) => any
) => {
  let filtered = users;
  // Apply search filter
  if (searchText) {
    filtered = filtered.filter((user: any) =>
      user.name.toLowerCase().includes(searchText.toLowerCase())
    );
  }

  // Apply category filter
  if (category !== "All") {
    filtered = filtered.filter(
      (user: any) => user.status.toLowerCase() === category.toLowerCase()
    );
  }

  setFilteredUsers(() => filtered);
};

export const getFontFamily = (
  baseFont: "DMSans" | "Urbanist" = "Urbanist", // Default base font
  weight: number | string = "400" // Default weight
): string => {
  const formattedBaseFont = `${baseFont}_`; // Format the base font
  switch (weight.toString()) {
    case "normal":
    case "400":
      return `${formattedBaseFont}400Regular`; // Default font
    case "500":
      return `${formattedBaseFont}500Medium`;
    case "600":
      return `${formattedBaseFont}600SemiBold`;
    case "bold":
    case "700":
      return `${formattedBaseFont}700Bold`;
    default:
      return `${formattedBaseFont}400Regular`; // Fallback to Regular
  }
};
