"use client";

import React from "react";
import { Button } from "./ui/button";
import { logOut } from "@/actions/actions";

export default function SignOutBtn() {
  return <Button onClick={() => logOut()}>Sign out</Button>;
}
