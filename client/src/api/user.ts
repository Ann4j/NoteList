
import { z } from "zod"
import { validateResponse } from "./validateresponse";

// export interface User {
//     id: string,
//     email: string,
//     username: string
// }

export const userSchema = z.object({
  id: z.string(),
  email: z.string(),
  username: z.string()
});

export type User = z.infer<typeof userSchema>;

export function fetchUser(id: string): Promise<User> {
  return fetch(`api/users/me/${id}`)
    .then((response) => response.json())
    .then((data) => userSchema.parse(data))
}

export function regiserUser(data:any): Promise<void> {
  return fetch(`api/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  }).then(() => undefined)
}

export function login(data:any): Promise<void> {
  return fetch(`api/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(validateResponse)
    .then(() => undefined)
}

export function fetchMe(): Promise<User> {
  return fetch(`api/users/me`)
    .then(validateResponse)
    .then((response) => response.json())
    .then((data) => userSchema.parse(data))
}

export function deactivateUser(): Promise<void> {
  return fetch(`/api/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    }
  })
    .then(validateResponse)
    .then(() => undefined)
};
