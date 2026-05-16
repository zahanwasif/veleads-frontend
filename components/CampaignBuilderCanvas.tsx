'use client';

import { motion } from 'framer-motion';
type Node = {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  icon?: string;
};
const nodes = {
  start: {
    x: 40,
    y: 220,
    w: 80,
    h: 40,
    label: 'Start'
  } as Node,
  find: {
    x: 160,
    y: 220,
    w: 140,
    h: 40,
    label: 'Find Leads',
    icon: 'search'
  } as Node,
  qualify: {
    x: 340,
    y: 220,
    w: 140,
    h: 40,
    label: 'Qualify Lead',
    icon: 'check'
  } as Node,
  diamond: {
    cx: 540,
    cy: 240
  },
  linkedin: {
    x: 620,
    y: 100,
    w: 160,
    h: 40,
    label: 'LinkedIn Msg',
    icon: 'message'
  } as Node,
  whatsapp: {
    x: 820,
    y: 100,
    w: 180,
    h: 40,
    label: 'WhatsApp Follow-Up',
    icon: 'message'
  } as Node,
  flag: {
    x: 1040,
    y: 100,
    w: 150,
    h: 40,
    label: 'Flag Opportunity',
    icon: 'flag'
  } as Node,
  email: {
    x: 620,
    y: 340,
    w: 140,
    h: 40,
    label: 'Send Email',
    icon: 'mail'
  } as Node,
  noReply: {
    x: 800,
    y: 340,
    w: 140,
    h: 40,
    label: 'No Reply?',
    icon: 'help'
  } as Node,
  nurture: {
    x: 980,
    y: 340,
    w: 140,
    h: 40,
    label: 'Enter Nurture',
    icon: 'clock'
  } as Node
};
const rightOf = (n: Node) => ({
  x: n.x + n.w,
  y: n.y + n.h / 2
});
const leftOf = (n: Node) => ({
  x: n.x,
  y: n.y + n.h / 2
});
const NodeIcon = ({ type, x, y }: {type: string;x: number;y: number;}) => {
  const t = `translate(${x}, ${y})`;
  switch (type) {
    case 'search':
      return (
        <g transform={t}>
          <circle
            cx="6"
            cy="6"
            r="5"
            fill="none"
            stroke="white"
            strokeWidth="1.3" />
          
          <line
            x1="10"
            y1="10"
            x2="14"
            y2="14"
            stroke="white"
            strokeWidth="1.3"
            strokeLinecap="round" />
          
        </g>);

    case 'check':
      return (
        <g transform={t}>
          <circle
            cx="8"
            cy="8"
            r="7"
            fill="none"
            stroke="white"
            strokeWidth="1.3" />
          
          <path
            d="M 5 8 L 7 10 L 11 6"
            stroke="white"
            strokeWidth="1.3"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round" />
          
        </g>);

    case 'message':
      return (
        <g transform={t}>
          <path
            d="M 1 3 a 2 2 0 0 1 2 -2 h 10 a 2 2 0 0 1 2 2 v 6 a 2 2 0 0 1 -2 2 H 6 L 3 14 v -3 H 3 a 2 2 0 0 1 -2 -2 z"
            fill="none"
            stroke="white"
            strokeWidth="1.3"
            strokeLinejoin="round" />
          
        </g>);

    case 'mail':
      return (
        <g transform={t}>
          <rect
            x="1"
            y="3"
            width="14"
            height="10"
            rx="1.5"
            fill="none"
            stroke="white"
            strokeWidth="1.3" />
          
          <path
            d="M 1.5 4 L 8 9 L 14.5 4"
            stroke="white"
            strokeWidth="1.3"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round" />
          
        </g>);

    case 'flag':
      return (
        <g transform={t}>
          <path
            d="M 3 1 V 15"
            stroke="white"
            strokeWidth="1.3"
            strokeLinecap="round" />
          
          <path
            d="M 3 2 H 13 L 10 5 L 13 8 H 3"
            fill="none"
            stroke="white"
            strokeWidth="1.3"
            strokeLinejoin="round" />
          
        </g>);

    case 'clock':
      return (
        <g transform={t}>
          <circle
            cx="8"
            cy="8"
            r="7"
            fill="none"
            stroke="white"
            strokeWidth="1.3" />
          
          <path
            d="M 8 4 V 8 L 10.5 10"
            stroke="white"
            strokeWidth="1.3"
            fill="none"
            strokeLinecap="round" />
          
        </g>);

    case 'help':
      return (
        <g transform={t}>
          <circle
            cx="8"
            cy="8"
            r="7"
            fill="none"
            stroke="white"
            strokeWidth="1.3" />
          
          <path
            d="M 6 6 a 2 2 0 1 1 2.5 2 V 9.5"
            fill="none"
            stroke="white"
            strokeWidth="1.3"
            strokeLinecap="round" />
          
          <circle cx="8" cy="12" r="0.6" fill="white" />
        </g>);

    default:
      return null;
  }
};
const renderNode = (n: Node) =>
<g>
    <rect x={n.x} y={n.y} width={n.w} height={n.h} rx="6" fill="#1A1A1A" />
    {n.icon && <NodeIcon type={n.icon} x={n.x + 12} y={n.y + n.h / 2 - 8} />}
    <text
    x={n.icon ? n.x + 36 : n.x + n.w / 2}
    y={n.y + n.h / 2 + 4}
    fill="white"
    fontSize="12"
    fontFamily="Inter"
    fontWeight="500"
    textAnchor={n.icon ? 'start' : 'middle'}>
    
      {n.label}
    </text>
  </g>;

// Define the lead dot path along the "yes" branch:
// start -> find -> qualify -> diamond -> linkedin -> whatsapp -> flag
const dotPath = `
  M ${rightOf(nodes.start).x} ${rightOf(nodes.start).y}
  L ${leftOf(nodes.find).x} ${leftOf(nodes.find).y}
  L ${rightOf(nodes.find).x} ${rightOf(nodes.find).y}
  L ${leftOf(nodes.qualify).x} ${leftOf(nodes.qualify).y}
  L ${rightOf(nodes.qualify).x} ${rightOf(nodes.qualify).y}
  L ${nodes.diamond.cx - 20} ${nodes.diamond.cy}
  L ${nodes.diamond.cx} ${nodes.diamond.cy - 20}
  L ${nodes.diamond.cx} ${nodes.linkedin.y + nodes.linkedin.h / 2}
  L ${leftOf(nodes.linkedin).x} ${leftOf(nodes.linkedin).y}
  L ${rightOf(nodes.linkedin).x} ${rightOf(nodes.linkedin).y}
  L ${leftOf(nodes.whatsapp).x} ${leftOf(nodes.whatsapp).y}
  L ${rightOf(nodes.whatsapp).x} ${rightOf(nodes.whatsapp).y}
  L ${leftOf(nodes.flag).x} ${leftOf(nodes.flag).y}
`;
export function CampaignBuilderCanvas() {
  return (
    <motion.div
      className="bg-white border border-[#E5E5E5] rounded-2xl shadow-[0px_8px_32px_rgba(0,0,0,0.08)] overflow-hidden"
      animate={{
        y: [-2, 2, -2]
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: 'easeInOut'
      }}>
      
      {/* Header Bar */}
      <div className="h-10 border-b border-[#E5E5E5] flex items-center justify-between px-4 bg-white shrink-0">
        <span className="text-xs text-[#6B6B6B] font-medium">
          Campaign Builder
        </span>
        <div className="flex space-x-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#E5E5E5]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#E5E5E5]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#E5E5E5]" />
        </div>
      </div>

      {/* Canvas Area */}
      <div className="aspect-[1200/480] w-full bg-white relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `radial-gradient(#0F0F0F 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }} />
        

        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1200 480"
          preserveAspectRatio="xMidYMid meet">
          
          {/* Spine connecting lines */}
          <line
            x1={rightOf(nodes.start).x}
            y1={rightOf(nodes.start).y}
            x2={leftOf(nodes.find).x}
            y2={leftOf(nodes.find).y}
            stroke="#333333"
            strokeWidth="1" />
          
          <line
            x1={rightOf(nodes.find).x}
            y1={rightOf(nodes.find).y}
            x2={leftOf(nodes.qualify).x}
            y2={leftOf(nodes.qualify).y}
            stroke="#333333"
            strokeWidth="1" />
          
          <line
            x1={rightOf(nodes.qualify).x}
            y1={rightOf(nodes.qualify).y}
            x2={nodes.diamond.cx - 20}
            y2={nodes.diamond.cy}
            stroke="#333333"
            strokeWidth="1" />
          

          {/* Yes branch */}
          <path
            d={`M ${nodes.diamond.cx} ${nodes.diamond.cy - 20} L ${nodes.diamond.cx} ${nodes.linkedin.y + nodes.linkedin.h / 2} L ${leftOf(nodes.linkedin).x} ${leftOf(nodes.linkedin).y}`}
            stroke="#333333"
            strokeWidth="1"
            fill="none" />
          
          <line
            x1={rightOf(nodes.linkedin).x}
            y1={rightOf(nodes.linkedin).y}
            x2={leftOf(nodes.whatsapp).x}
            y2={leftOf(nodes.whatsapp).y}
            stroke="#333333"
            strokeWidth="1" />
          
          <line
            x1={rightOf(nodes.whatsapp).x}
            y1={rightOf(nodes.whatsapp).y}
            x2={leftOf(nodes.flag).x}
            y2={leftOf(nodes.flag).y}
            stroke="#333333"
            strokeWidth="1" />
          

          {/* No branch */}
          <path
            d={`M ${nodes.diamond.cx} ${nodes.diamond.cy + 20} L ${nodes.diamond.cx} ${nodes.email.y + nodes.email.h / 2} L ${leftOf(nodes.email).x} ${leftOf(nodes.email).y}`}
            stroke="#333333"
            strokeWidth="1"
            fill="none" />
          
          <line
            x1={rightOf(nodes.email).x}
            y1={rightOf(nodes.email).y}
            x2={leftOf(nodes.noReply).x}
            y2={leftOf(nodes.noReply).y}
            stroke="#333333"
            strokeWidth="1" />
          
          <line
            x1={rightOf(nodes.noReply).x}
            y1={rightOf(nodes.noReply).y}
            x2={leftOf(nodes.nurture).x}
            y2={leftOf(nodes.nurture).y}
            stroke="#333333"
            strokeWidth="1" />
          

          {/* Yes / No labels */}
          <text
            x={nodes.diamond.cx + 8}
            y={nodes.diamond.cy - 100}
            fill="#A0A0A0"
            fontSize="11"
            fontFamily="Inter">
            
            Yes
          </text>
          <text
            x={nodes.diamond.cx + 8}
            y={nodes.diamond.cy + 100}
            fill="#A0A0A0"
            fontSize="11"
            fontFamily="Inter">
            
            No
          </text>

          {/* All Nodes */}
          {renderNode(nodes.start)}
          {renderNode(nodes.find)}
          {renderNode(nodes.qualify)}

          {/* Diamond */}
          <g transform={`translate(${nodes.diamond.cx}, ${nodes.diamond.cy})`}>
            <path d="M 0 -20 L 20 0 L 0 20 L -20 0 Z" fill="#1A1A1A" />
            <text
              x="0"
              y="46"
              fill="#6B6B6B"
              fontSize="11"
              textAnchor="middle"
              fontFamily="Inter">
              
              Engaged?
            </text>
          </g>

          {renderNode(nodes.linkedin)}
          {renderNode(nodes.whatsapp)}
          {renderNode(nodes.flag)}
          {renderNode(nodes.email)}
          {renderNode(nodes.noReply)}
          {renderNode(nodes.nurture)}

          {/* Animated Lead Dot — traverses the YES branch path */}
          <motion.circle
            r="5"
            fill="white"
            stroke="#0F0F0F"
            strokeWidth="1.5"
            style={{
              filter: 'drop-shadow(0 0 4px rgba(255,255,255,0.8))',
              offsetPath: `path('${dotPath.replace(/\s+/g, ' ').trim()}')`
            }}
            animate={{
              offsetDistance: ['0%', '100%']
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'linear',
              repeatDelay: 0.5
            }} />
          
        </svg>
      </div>
    </motion.div>);

}