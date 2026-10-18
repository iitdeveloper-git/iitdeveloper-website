/** Original illustrative plates, not client work or performance claims. */
export default function ServiceArtwork({ variant }: { variant: number }) {
  return (
    <svg viewBox="0 0 720 440" fill="none" className="service-artwork" aria-hidden="true" focusable="false">
      <g className="service-artwork__guides" stroke="currentColor" opacity=".2">
        <path d="M40 40H680V400H40ZM40 220H680M360 40V400" />
        <path d="M30 40H50M40 30V50M670 400H690M680 390V410" />
      </g>
      {variant === 0 && <g strokeLinejoin="round">
        <path d="M125 105L485 65L560 315L200 355Z" fill="hsl(var(--surface-muted))" stroke="hsl(var(--lime) / .8)" />
        <path d="M125 105L200 355V370L125 120ZM200 355L560 315V330L200 370Z" fill="hsl(var(--obsidian))" stroke="hsl(var(--lime))" />
        <path d="M142 128L483 90M156 170L298 154L315 213L173 229Z" stroke="hsl(var(--lime) / .8)" />
        <path d="M182 254L324 238L343 301L201 317Z" fill="hsl(var(--lime))" />
        <path d="M330 165L468 149M337 186L475 170M344 207L443 196M361 267L492 252" stroke="hsl(var(--lime) / .8)" strokeWidth="5" />
        <path d="M460 192L562 180L607 334L505 346Z" fill="hsl(var(--lime) / .5)" stroke="hsl(var(--surface-elevated))" />
        <path d="M479 213L549 205L573 287L503 295Z" fill="hsl(var(--lime))" />
        <path d="M512 316L574 309M150 115L157 114M167 113L174 112" stroke="hsl(var(--lime))" strokeWidth="5" />
      </g>}
      {variant === 1 && <g strokeLinejoin="round">
        <path d="M150 280L360 175L570 280L360 385Z" fill="hsl(var(--surface-muted))" stroke="hsl(var(--lime))" />
        <path d="M150 280V300L360 405L570 300V280M360 385V405" stroke="hsl(var(--lime) / .8)" />
        <path d="M230 280L360 215L490 280L360 345Z" stroke="hsl(var(--lime) / .8)" />
        <path className="service-artwork__agent-link" d="M360 315V248M230 280V165H300M490 280V165H420" stroke="hsl(var(--lime))" strokeDasharray="4 7" />
        <path d="M300 138L360 108L420 138V218L360 248L300 218Z" fill="hsl(var(--lime))" stroke="hsl(var(--lime) / .8)" />
        <path d="M300 138L360 168L420 138M360 168V248" stroke="hsl(var(--surface-elevated))" />
        <path d="M330 137L360 122L390 137L360 152Z" fill="hsl(var(--lime))" />
        {[190, 490].map(x => <g key={x}><path d={`M${x} 145l40-20 40 20-40 20Z`} fill="hsl(var(--lime) / .5)" stroke="hsl(var(--lime) / .8)" /><path d={`M${x} 145v30l40 20 40-20v-30m-40 20v30`} stroke="hsl(var(--lime) / .8)" /></g>)}
      </g>}
      {variant === 2 && <g strokeLinejoin="round">
        <path d="M100 220H220V125H390V220H610M220 220V315H390V220M390 125H510V220" stroke="hsl(var(--lime) / .8)" strokeWidth="2" />
        <path className="service-artwork__data-flow" d="M100 220H220V315H390V220H610" stroke="hsl(var(--lime))" strokeWidth="3" strokeDasharray="8 10" />
        {[[100,220],[220,125],[220,315],[390,220],[510,125],[610,220]].map(([x,y],i) => <g key={i}>
          <path d={`M${x-29} ${y}l29-29 29 29-29 29Z`} fill={i===3?'hsl(var(--lime))':'hsl(var(--surface-muted))'} stroke={i===3?'hsl(var(--lime))':'hsl(var(--lime) / .8)'} />
          <path d={`M${x-10} ${y}h20m-10-10v20`} stroke={i===3?'hsl(var(--lime) / .5)':'hsl(var(--lime) / .8)'} />
        </g>)}
        <path d="M80 70H640M80 370H640" stroke="hsl(var(--lime))" strokeDasharray="1 9" />
      </g>}
      {variant === 3 && <g strokeLinejoin="round">
        <path d="M108 118L398 70L612 162L320 214Z" fill="hsl(var(--lime) / .5)" stroke="hsl(var(--lime) / .8)" />
        <path d="M108 118V315L320 386V214M320 214L612 162V350L320 386" fill="hsl(var(--surface-muted))" stroke="hsl(var(--lime) / .8)" />
        <path d="M136 143L398 101L581 177L320 223Z" fill="hsl(var(--lime))" stroke="hsl(var(--surface-elevated))" />
        <path d="M164 162L300 140L385 161L249 185Z" fill="hsl(var(--lime) / .8)" />
        <path d="M182 213L300 194L300 288L182 252Z" fill="hsl(var(--lime) / .5)" stroke="hsl(var(--lime) / .8)" />
        <path d="M204 218L278 206L278 256L204 233Z" fill="hsl(var(--lime))" />
        <path d="M326 235L455 212L455 288L326 311Z" fill="hsl(var(--obsidian))" stroke="hsl(var(--lime) / .8)" />
        <path d="M348 249L416 237M348 263L430 249M348 278L395 269" stroke="hsl(var(--lime) / .8)" strokeWidth="4" />
        <path d="M485 205L560 192V297L485 310Z" fill="hsl(var(--lime) / .5)" stroke="hsl(var(--lime))" />
        <path d="M505 221L540 215V231L505 237Z" fill="hsl(var(--lime))" />
        <path d="M505 250L543 244M505 264L543 258M505 278L530 274" stroke="hsl(var(--surface-elevated))" strokeWidth="3" />
        <path className="service-artwork__checkout" d="M488 324L560 311L584 322L512 335Z" fill="hsl(var(--lime))" stroke="hsl(var(--lime))" />
        <path d="M130 342L205 365M548 351L592 339" stroke="hsl(var(--lime))" strokeWidth="3" />
      </g>}
      {variant === 4 && <g strokeLinejoin="round">
        <path d="M100 320L360 190L620 320L360 405Z" stroke="hsl(var(--lime))" />
        {[{x:190,y:263,h:55},{x:290,y:230,h:105},{x:390,y:197,h:155},{x:490,y:164,h:205}].map(({x,y,h},i)=><g key={x}>
          <path className="service-artwork__bar" d={`M${x} ${y}l36-18 36 18v${h}l-36 18-36-18Z`} fill="hsl(var(--lime) / .5)" stroke="hsl(var(--lime) / .8)" />
          <path d={`M${x} ${y}l36 18 36-18m-36 18v${h}`} stroke="hsl(var(--lime) / .8)" />
          <path d={`M${x} ${y}l36-18 36 18-36 18Z`} fill={i===3?'hsl(var(--lime))':'hsl(var(--lime))'} />
        </g>)}
        <path d="M174 235L274 202L374 169L474 136L540 100M520 100H540V120" stroke="hsl(var(--lime))" strokeWidth="2" />
      </g>}
      {variant === 5 && <g>
        <path d="M150 70H510V365H150Z" fill="hsl(var(--surface-muted))" stroke="hsl(var(--lime) / .8)" />
        <path d="M175 95H485V340H175ZM175 218H485M330 95V340" stroke="hsl(var(--lime))" />
        <circle cx="330" cy="218" r="103" stroke="hsl(var(--lime))" strokeWidth="2" />
        <path d="M227 321L330 115L433 321Z" fill="hsl(var(--lime))" stroke="hsl(var(--lime) / .8)" />
        <circle cx="330" cy="247" r="44" fill="hsl(var(--lime))" />
        <path d="M510 125H570V365H510M175 380H485" stroke="hsl(var(--lime) / .8)" />
        <path d="M535 146H551V162H535ZM535 177H551V193H535ZM535 208H551V224H535Z" fill="hsl(var(--lime))" />
        <path d="M535 239H551V255H535Z" fill="hsl(var(--lime))" />
      </g>}
    </svg>
  );
}
