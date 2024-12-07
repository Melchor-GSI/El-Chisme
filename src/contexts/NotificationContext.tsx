'use client'

import React, { createContext, useContext, useState, useCallback } from 'react'

type NotificationType = 'success' | 'error' | 'info'

interface Notification {
  id: number
  type: NotificationType
  message: string
}

interface NotificationContextType {
  notifications: Notification[]
  addNotification: (type: NotificationType, message: string) => void
  removeNotification: (id: number) => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export const useNotification = () => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider')
  }
  return context
}

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([])

  const addNotification = useCallback((type: NotificationType, message: string) => {
    const id = Date.now()
    setNotifications(prev => [...prev, { id, type, message }])

    // Auto-remove notification after 5 seconds
    setTimeout(() => {
      removeNotification(id)
    }, 5000)
  }, [])

  const removeNotification = useCallback((id: number) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id))
  }, [])

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, removeNotification }}>
      {children}
    </NotificationContext.Provider>
  )
}

