package fdit.alteration.core.basestation.engine;

import fdit.alteration.core.incident.UnknownScopeException;
import org.junit.Test;

import java.time.Instant;

import static fdit.alteration.core.basestation.BstHelper.timestampedBstMessage;
import static fdit.alteration.core.basestation.engine.BaseStationActionEngine.isMessageInScope;
import static fdit.alteration.core.incident.IncidentHelper.timeWindow;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

public class BaseStationActionEngineTest {

    @Test
    public void bstActionEngine_isMessageInScope() throws UnknownScopeException {
        final long now = Instant.now().toEpochMilli();
        assertTrue(isMessageInScope(timestampedBstMessage(now + 10000), timeWindow(10000, 11000), now));
        assertTrue(isMessageInScope(timestampedBstMessage(now + 11000), timeWindow(10000, 11000), now));
        assertTrue(isMessageInScope(timestampedBstMessage(now + 10000), timeWindow(10000, 10000), now));

        assertTrue(isMessageInScope(timestampedBstMessage(now + 15000), timeWindow(15000, 45000), now));
        assertTrue(isMessageInScope(timestampedBstMessage(now + 45000), timeWindow(15000, 45000), now));
        assertTrue(isMessageInScope(timestampedBstMessage(now + 15100), timeWindow(15000, 45000), now));
        assertTrue(isMessageInScope(timestampedBstMessage(now + 44900), timeWindow(15000, 45000), now));
        assertTrue(isMessageInScope(timestampedBstMessage(now + 20000), timeWindow(15000, 45000), now));

        assertFalse(isMessageInScope(timestampedBstMessage(now + 14900), timeWindow(15000, 15000), now));
        assertFalse(isMessageInScope(timestampedBstMessage(now + 15100), timeWindow(15000, 15000), now));

        assertFalse(isMessageInScope(timestampedBstMessage(now + 14900), timeWindow(15000, 45000), now));
        assertFalse(isMessageInScope(timestampedBstMessage(now + 45100), timeWindow(15000, 45000), now));
    }
}