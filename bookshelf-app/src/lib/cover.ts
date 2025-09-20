export const coverUrl = (id?: number, size: "S" | "M" | "L" = "M") =>
  id ? `https://covers.openlibrary.org/b/id/${id}-${size}.jpg` : "/stamp.svg";
