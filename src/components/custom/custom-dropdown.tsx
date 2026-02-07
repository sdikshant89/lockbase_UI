import { cn } from '@/lib/utils';
import React, { useEffect, useRef, useState } from 'react';

interface DropdownProps {
  children: React.ReactNode;
  trigger: React.ReactNode;
  align?: 'start' | 'center' | 'end';
  side?: 'top' | 'bottom' | 'left' | 'right';
  sideOffset?: number;
  className?: string;
}

export function CustomDropdown({
  children,
  trigger,
  align = 'center',
  side = 'bottom',
  sideOffset = 4,
  className,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const calculatePosition = () => {
    if (!triggerRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let top = 0;
    let left = 0;

    // Calculate vertical position
    switch (side) {
      case 'top':
        top = triggerRect.top - sideOffset;
        break;
      case 'bottom':
        top = triggerRect.bottom + sideOffset;
        break;
      case 'left':
      case 'right':
        top = triggerRect.top;
        break;
    }

    // Calculate horizontal position
    switch (side) {
      case 'left':
        left = triggerRect.left - sideOffset;
        break;
      case 'right':
        left = triggerRect.right + sideOffset;
        break;
      case 'top':
      case 'bottom':
        switch (align) {
          case 'start':
            left = triggerRect.left;
            break;
          case 'center':
            left = triggerRect.left + triggerRect.width / 2;
            break;
          case 'end':
            left = triggerRect.right;
            break;
        }
        break;
    }

    // Adjust for viewport boundaries
    if (contentRef.current) {
      const contentRect = contentRef.current.getBoundingClientRect();

      // Prevent overflow on right
      if (left + contentRect.width > viewportWidth) {
        left = viewportWidth - contentRect.width - 8;
      }

      // Prevent overflow on left
      if (left < 8) {
        left = 8;
      }

      // Prevent overflow on bottom
      if (top + contentRect.height > viewportHeight) {
        top = triggerRect.top - contentRect.height - sideOffset;
      }

      // Prevent overflow on top
      if (top < 8) {
        top = triggerRect.bottom + sideOffset;
      }
    }

    setPosition({ top, left });
  };

  useEffect(() => {
    if (isOpen) {
      calculatePosition();

      const handleResize = () => calculatePosition();
      const handleScroll = () => calculatePosition();

      window.addEventListener('resize', handleResize);
      window.addEventListener('scroll', handleScroll, true);

      return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('scroll', handleScroll, true);
      };
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          contentRef.current &&
          triggerRef.current &&
          !contentRef.current.contains(event.target as Node) &&
          !triggerRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          setIsOpen(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('keydown', handleEscape);
      };
    }
  }, [isOpen]);

  return (
    <>
      <div
        ref={triggerRef}
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer w-full flex justify-center items-center"
      >
        {trigger}
      </div>

      {isOpen && (
        <div
          ref={contentRef}
          className={cn(
            'fixed z-[9999] min-w-[8rem] rounded-md border bg-popover p-1 text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95',
            side === 'bottom' && 'slide-in-from-top-2',
            side === 'top' && 'slide-in-from-bottom-2',
            side === 'left' && 'slide-in-from-right-2',
            side === 'right' && 'slide-in-from-left-2',
            className,
          )}
          style={{
            top: position.top,
            left:
              align === 'center' && (side === 'top' || side === 'bottom')
                ? position.left - (contentRef.current?.offsetWidth || 0) / 2
                : align === 'end' && (side === 'top' || side === 'bottom')
                  ? position.left - (contentRef.current?.offsetWidth || 0)
                  : position.left,
          }}
        >
          {children}
        </div>
      )}
    </>
  );
}

// Helper components for consistent styling
export function DropdownMenuItem({
  children,
  onClick,
  className,
  variant = 'default',
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'default' | 'destructive';
}) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        variant === 'destructive' &&
          'text-destructive hover:bg-destructive/10 focus:bg-destructive/10',
        className,
      )}
    >
      {children}
    </div>
  );
}

export function DropdownMenuSeparator({ className }: { className?: string }) {
  return <div className={cn('-mx-1 my-1 h-px bg-border', className)} />;
}

export function DropdownMenuLabel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('px-2 py-1.5 text-sm font-medium', className)}>
      {children}
    </div>
  );
}

export function DropdownMenuGroup({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
}
