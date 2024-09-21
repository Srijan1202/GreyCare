"use client"

import { NavbarComponent } from "@/components/navbar"
import EnhancedAuth from "../../components/EnhancedAuth"

export default function login() {
  return (
    <div>
      <NavbarComponent/>
      <EnhancedAuth />
    </div>
  )
}
