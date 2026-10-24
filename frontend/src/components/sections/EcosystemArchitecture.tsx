/** Isometric architectural assembly. Colors come from the existing brand scale. */
export default function EcosystemArchitecture() {
  return (
    <g className="ecosystem" aria-hidden="true" strokeLinejoin="round">
      <g className="ecosystem__camera">
      <g className="ecosystem__spine" fill="none" stroke="var(--color-accent)">
        <path d="M180 152V356M420 152V356M300 215V420M300 92V296" />
        <path d="M180 356L300 420L420 356M180 152L300 92L420 152" strokeDasharray="3 6" />
      </g>
      <g className="ecosystem__layer ecosystem__layer--cloud">
        <g className="ecosystem__arrival ecosystem__arrival--cloud">
          <path d="M140 330L300 250L460 330L300 410Z" fill="var(--color-bg-elevated)" stroke="var(--color-accent)" />
          <path d="M140 330L300 410V437L140 357Z" fill="var(--color-bg-surface)" stroke="var(--color-accent)" />
          <path d="M300 410L460 330V357L300 437Z" fill="var(--color-bg-base)" stroke="var(--color-accent)" />
          {[0, 1, 2, 3, 4, 5, 6].map(i => <path key={i} d={`M${315 + i * 19} ${410 - i * 9.5}v12`} stroke="var(--color-accent)" />)}
          <path d="M166 331L300 264L434 331L300 398Z" fill="none" stroke="var(--color-accent)" />
          <g fill="none" stroke="var(--color-accent)" strokeWidth="1.5">
            {Array.from({ length: 9 }, (_, i) => <path key={i} d={`M${228 + i * 10} ${305 + i * 5}l52-26`} />)}
          </g>
          <path d="M180 348L225 370M180 354L225 376" stroke="var(--color-accent)" />
        </g>
      </g>
      <g className="ecosystem__layer ecosystem__layer--automation">
        <g className="ecosystem__arrival ecosystem__arrival--automation">
          <path d="M155 266L300 194L445 266L300 339Z" fill="var(--color-bg-surface)" stroke="var(--color-accent)" />
          <path d="M155 266L300 339V351L155 278Z" fill="var(--color-bg-elevated)" stroke="var(--color-accent)" />
          <path d="M300 339L445 266V278L300 351Z" fill="var(--color-bg-base)" stroke="var(--color-accent)" />
          <g fill="none" stroke="var(--color-accent)">
            <path d="M182 266L246 234L300 261L354 234L418 266L354 298L300 271L246 298Z" />
            <path d="M216 266L300 224L384 266L300 308Z" />
          </g>
          <path className="ecosystem__flow" d="M182 266L246 234L300 261L354 234L418 266L354 298L300 271L246 298Z" fill="none" stroke="var(--color-accent)" strokeWidth="2" />
          {[222, 300, 378].map((x) => <path key={x} d={`M${x} 255l16 8-16 8-16-8Z`} fill="var(--color-accent)" stroke="var(--color-accent)" />)}
        </g>
      </g>
      <g className="ecosystem__layer ecosystem__layer--intelligence">
        <g className="ecosystem__arrival ecosystem__arrival--intelligence">
          <path d="M190 207L300 152L410 207L300 262Z" fill="var(--color-bg-elevated)" stroke="var(--color-accent)" />
          <path d="M190 207L300 262V276L190 221Z" fill="var(--color-bg-surface)" stroke="var(--color-accent)" />
          <path d="M300 262L410 207V221L300 276Z" fill="var(--color-bg-base)" stroke="var(--color-accent)" />
          <g fill="none" stroke="var(--color-accent)">
            {[-2, -1, 0, 1, 2].map(i => <path key={i} d={`M${252 + i * 12} ${204 - i * 6}l-26-13m${100 + i * 12} ${-10 - i * 6}l26 13`} />)}
            <path d="M214 207L300 164L386 207L300 250Z" />
          </g>
          <path d="M261 185L300 165L339 185L300 205Z" fill="var(--color-text-secondary)" stroke="var(--color-accent)" />
          <path d="M261 185L300 205V233L261 213Z" fill="var(--color-accent)" stroke="var(--color-accent)" />
          <path d="M300 205L339 185V213L300 233Z" fill="var(--color-bg-elevated)" stroke="var(--color-accent)" />
          <path d="M279 185L300 175L321 185L300 196Z" fill="none" stroke="var(--color-border)" />
        </g>
      </g>
      <g className="ecosystem__layer ecosystem__layer--product">
        <g className="ecosystem__arrival ecosystem__arrival--product">
          <path d="M140 132L300 52L460 132L300 212Z" fill="var(--color-accent)" stroke="var(--color-accent)" />
          <path d="M140 132L300 212V223L140 143Z" fill="var(--color-bg-elevated)" stroke="var(--color-accent)" />
          <path d="M300 212L460 132V143L300 223Z" fill="var(--color-bg-surface)" stroke="var(--color-accent)" />
          <path d="M163 132L300 64L437 132L300 200Z" fill="var(--color-bg-surface)" stroke="var(--color-accent)" />
          <path d="M178 131L300 70L422 131L300 192Z" fill="var(--color-bg-elevated)" />
          <path d="M178 131L300 70L329 85L207 146Z" fill="var(--color-accent)" />
          <path d="M224 143L288 111L318 126L254 158Z" fill="var(--color-accent)" />
          <path d="M266 164L330 132L360 147L296 179Z" fill="var(--color-accent)" stroke="var(--color-accent)" />
          <path d="M300 105L335 88M310 110L345 93M320 115L355 98" stroke="var(--color-text-primary)" />
          <path d="M343 126L378 109M353 131L388 114" stroke="var(--color-accent)" />
          <g fill="none" stroke="var(--color-accent)">
            {Array.from({ length: 12 }, (_, i) => <path key={i} d={`M${154 + i * 12} ${139 + i * 6}v5M${308 + i * 12} ${214 - i * 6}v5`} />)}
          </g>
          <path className="ecosystem__material-light" d="M163 132L300 64L437 132M300 200L437 132" fill="none" stroke="var(--color-text-primary)" strokeWidth="2" />
          <g className="ecosystem__fasteners" fill="var(--color-accent)">
            <path d="M158 130l5-3 5 3-5 3Z" />
            <path d="M295 64l5-3 5 3-5 3Z" />
            <path d="M432 132l5-3 5 3-5 3Z" />
            <path d="M295 199l5-3 5 3-5 3Z" />
          </g>
          <path d="M193 132L202 127M207 125L216 120M221 118L230 113" stroke="var(--color-accent)" strokeWidth="2" />
        </g>
      </g>
      </g>
      <g className="ecosystem__annotations" fill="none" stroke="var(--color-accent)">
        <path d="M144 132H78V89H30M415 207H499V182H570M445 278H499V305H570M155 357H78V384H30" />
        <path d="M300 445V465M290 465H310" />
      </g>
    </g>
  );
}
